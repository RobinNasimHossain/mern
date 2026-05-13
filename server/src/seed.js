import mongoose from "mongoose";
import { connectDb } from "./db.js";
import { User } from "./models/User.js";
import { Account } from "./models/Account.js";
import { Transaction } from "./models/Transaction.js";
import { generateAccountNumber, generateReference } from "./utils/money.js";

async function run() {
  await connectDb();

  await Promise.all([
    User.deleteMany({}),
    Account.deleteMany({}),
    Transaction.deleteMany({}),
  ]);

  const passwordHash = await User.hashPassword("password123");
  const demo = await User.create({
    name: "Demo User",
    email: "demo@example.com",
    passwordHash,
  });

  const checking = await Account.create({
    user: demo._id,
    accountNumber: generateAccountNumber(),
    type: "checking",
    name: "Primary Checking",
    balanceCents: 250000,
  });
  const savings = await Account.create({
    user: demo._id,
    accountNumber: generateAccountNumber(),
    type: "savings",
    name: "Rainy Day Savings",
    balanceCents: 1500000,
  });

  await Transaction.create([
    {
      account: checking._id,
      type: "deposit",
      amountCents: 250000,
      balanceAfterCents: 250000,
      description: "Opening deposit",
      reference: generateReference(),
    },
    {
      account: savings._id,
      type: "deposit",
      amountCents: 1500000,
      balanceAfterCents: 1500000,
      description: "Opening deposit",
      reference: generateReference(),
    },
  ]);

  // eslint-disable-next-line no-console
  console.log("Seeded demo@example.com / password123");
  await mongoose.disconnect();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
