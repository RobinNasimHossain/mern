import { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import { Account, ACCOUNT_TYPES } from "../models/Account.js";
import { Transaction } from "../models/Transaction.js";
import { requireAuth } from "../middleware/auth.js";
import { httpError } from "../middleware/error.js";
import { generateAccountNumber } from "../utils/money.js";

const router = Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res
    .status(400)
    .json({ error: errors.array()[0].msg, details: errors.array() });
}

router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user._id }).sort({
      createdAt: 1,
    });
    res.json({ accounts });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  [
    body("type").isIn(ACCOUNT_TYPES),
    body("name").isString().trim().isLength({ min: 1, max: 60 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      let accountNumber;
      for (let attempt = 0; attempt < 10; attempt += 1) {
        const candidate = generateAccountNumber();
        // eslint-disable-next-line no-await-in-loop
        if (!(await Account.exists({ accountNumber: candidate }))) {
          accountNumber = candidate;
          break;
        }
      }
      if (!accountNumber) throw httpError(500, "Could not allocate account number");

      const account = await Account.create({
        user: req.user._id,
        accountNumber,
        type: req.body.type,
        name: req.body.name,
        balanceCents: 0,
      });
      res.status(201).json({ account });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  [param("id").isMongoId()],
  validate,
  async (req, res, next) => {
    try {
      const account = await Account.findOne({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!account) throw httpError(404, "Account not found");
      res.json({ account });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id/transactions",
  [
    param("id").isMongoId(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
    query("before").optional().isISO8601(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const account = await Account.findOne({
        _id: req.params.id,
        user: req.user._id,
      });
      if (!account) throw httpError(404, "Account not found");
      const limit = req.query.limit || 25;
      const filter = { account: account._id };
      if (req.query.before) {
        filter.createdAt = { $lt: new Date(req.query.before) };
      }
      const transactions = await Transaction.find(filter)
        .sort({ createdAt: -1 })
        .limit(limit);
      res.json({ transactions });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
