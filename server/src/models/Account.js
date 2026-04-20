import mongoose from "mongoose";

const ACCOUNT_TYPES = ["checking", "savings"];

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: { type: String, enum: ACCOUNT_TYPES, required: true },
    name: { type: String, required: true, trim: true, maxlength: 60 },
    balanceCents: { type: Number, required: true, default: 0, min: 0 },
    currency: { type: String, required: true, default: "USD" },
  },
  { timestamps: true }
);

accountSchema.methods.toJSON = function toJSON() {
  return {
    id: this._id.toString(),
    accountNumber: this.accountNumber,
    type: this.type,
    name: this.name,
    balanceCents: this.balanceCents,
    balance: this.balanceCents / 100,
    currency: this.currency,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export { ACCOUNT_TYPES };
export const Account = mongoose.model("Account", accountSchema);
