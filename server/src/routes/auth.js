import { Router } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../models/User.js";
import { Account } from "../models/Account.js";
import { requireAuth, signToken } from "../middleware/auth.js";
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

async function createUniqueAccountNumber() {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const num = generateAccountNumber();
    // eslint-disable-next-line no-await-in-loop
    const exists = await Account.exists({ accountNumber: num });
    if (!exists) return num;
  }
  throw new Error("Could not generate unique account number");
}

router.post(
  "/register",
  [
    body("name").isString().trim().isLength({ min: 2, max: 80 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 8, max: 128 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) throw httpError(409, "Email already registered");

      const passwordHash = await User.hashPassword(password);
      const user = await User.create({ name, email, passwordHash });

      const accountNumber = await createUniqueAccountNumber();
      const account = await Account.create({
        user: user._id,
        accountNumber,
        type: "checking",
        name: "Primary Checking",
        balanceCents: 0,
      });

      const token = signToken(user._id);
      res
        .status(201)
        .json({ token, user: user.toSafeJSON(), account: account.toJSON() });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isString().isLength({ min: 1 }),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw httpError(401, "Invalid email or password");
      const ok = await user.verifyPassword(password);
      if (!ok) throw httpError(401, "Invalid email or password");
      const token = signToken(user._id);
      res.json({ token, user: user.toSafeJSON() });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
});

export default router;
