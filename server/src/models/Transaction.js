import mongoose from "mongoose";

const TRANSACTION_TYPES = [
  "deposit",
  "withdrawal",
  "transfer_in",
  "transfer_out",
];

const transactionSchema = new mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
      index: true,
    },
    counterAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      default: null,
    },
    counterAccountNumber: { type: String, default: null },
    type: { type: String, enum: TRANSACTION_TYPES, required: true },
    amountCents: { type: Number, required: true, min: 1 },
    balanceAfterCents: { type: Number, required: true, min: 0 },
    description: { type: String, default: "", maxlength: 140 },
    reference: { type: String, default: null, index: true },
  },
  { timestamps: true }
);

transactionSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    account: this.account.toString(),
    counterAccount: this.counterAccount ? this.counterAccount.toString() : null,
    counterAccountNumber: this.counterAccountNumber,
    type: this.type,
    amountCents: this.amountCents,
    amount: this.amountCents / 100,
    balanceAfterCents: this.balanceAfterCents,
    balanceAfter: this.balanceAfterCents / 100,
    description: this.description,
    reference: this.reference,
    createdAt: this.createdAt,
  };
};

export { TRANSACTION_TYPES };
export const Transaction = mongoose.model("Transaction", transactionSchema);
