import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Account } from "../models/Account.js";
import { Transaction } from "../models/Transaction.js";
import { requireAuth } from "../middleware/auth.js";
import { httpError } from "../middleware/error.js";
import { toCents, generateReference } from "../utils/money.js";

const router = Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res
    .status(400)
    .json({ error: errors.array()[0].msg, details: errors.array() });
}

router.use(requireAuth);

/**
 * Credit an account by atomically incrementing its balance.
 * Returns the updated account.
 */
async function creditAccount(accountId, amountCents) {
  const updated = await Account.findOneAndUpdate(
    { _id: accountId },
    { $inc: { balanceCents: amountCents } },
    { new: true }
  );
  if (!updated) throw httpError(404, "Account not found");
  return updated;
}

/**
 * Debit an account only if sufficient funds are available. The conditional
 * $gte filter prevents a balance from ever going negative under concurrent
 * writes. Returns the updated account or null if insufficient funds.
 */
async function debitAccount(accountId, amountCents) {
  return Account.findOneAndUpdate(
    { _id: accountId, balanceCents: { $gte: amountCents } },
    { $inc: { balanceCents: -amountCents } },
    { new: true }
  );
}

router.post(
  "/deposit",
  [
    body("accountId").isMongoId(),
    body("amount").exists(),
    body("description").optional().isString().isLength({ max: 140 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const amountCents = toCents(req.body.amount);
      const account = await Account.findOne({
        _id: req.body.accountId,
        user: req.user._id,
      });
      if (!account) throw httpError(404, "Account not found");

      const updated = await creditAccount(account._id, amountCents);
      const tx = await Transaction.create({
        account: updated._id,
        type: "deposit",
        amountCents,
        balanceAfterCents: updated.balanceCents,
        description: req.body.description || "Cash deposit",
        reference: generateReference(),
      });
      res.status(201).json({ account: updated, transaction: tx });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/withdraw",
  [
    body("accountId").isMongoId(),
    body("amount").exists(),
    body("description").optional().isString().isLength({ max: 140 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const amountCents = toCents(req.body.amount);
      const account = await Account.findOne({
        _id: req.body.accountId,
        user: req.user._id,
      });
      if (!account) throw httpError(404, "Account not found");

      const updated = await debitAccount(account._id, amountCents);
      if (!updated) throw httpError(400, "Insufficient funds");

      const tx = await Transaction.create({
        account: updated._id,
        type: "withdrawal",
        amountCents,
        balanceAfterCents: updated.balanceCents,
        description: req.body.description || "Cash withdrawal",
        reference: generateReference(),
      });
      res.status(201).json({ account: updated, transaction: tx });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/transfer",
  [
    body("fromAccountId").isMongoId(),
    body("toAccountNumber").isString().isLength({ min: 6, max: 20 }),
    body("amount").exists(),
    body("description").optional().isString().isLength({ max: 140 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const amountCents = toCents(req.body.amount);
      const fromAccount = await Account.findOne({
        _id: req.body.fromAccountId,
        user: req.user._id,
      });
      if (!fromAccount) throw httpError(404, "Source account not found");

      const toAccount = await Account.findOne({
        accountNumber: req.body.toAccountNumber,
      });
      if (!toAccount) throw httpError(404, "Destination account not found");

      if (toAccount._id.equals(fromAccount._id)) {
        throw httpError(400, "Cannot transfer to the same account");
      }

      const debited = await debitAccount(fromAccount._id, amountCents);
      if (!debited) throw httpError(400, "Insufficient funds");

      let credited;
      try {
        credited = await creditAccount(toAccount._id, amountCents);
      } catch (err) {
        // Compensate: refund the debit so balances stay consistent.
        await creditAccount(fromAccount._id, amountCents);
        throw err;
      }

      const reference = generateReference();
      const description = req.body.description || "Transfer";

      const [outTx, inTx] = await Promise.all([
        Transaction.create({
          account: debited._id,
          counterAccount: credited._id,
          counterAccountNumber: credited.accountNumber,
          type: "transfer_out",
          amountCents,
          balanceAfterCents: debited.balanceCents,
          description,
          reference,
        }),
        Transaction.create({
          account: credited._id,
          counterAccount: debited._id,
          counterAccountNumber: debited.accountNumber,
          type: "transfer_in",
          amountCents,
          balanceAfterCents: credited.balanceCents,
          description,
          reference,
        }),
      ]);

      res.status(201).json({
        fromAccount: debited,
        toAccount: {
          id: credited._id.toString(),
          accountNumber: credited.accountNumber,
          name: credited.name,
        },
        transactions: { out: outTx, in: inTx },
        reference,
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
