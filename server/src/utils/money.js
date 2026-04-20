import { httpError } from "../middleware/error.js";

export function toCents(input) {
  if (input == null) throw httpError(400, "Amount is required");
  const num = typeof input === "number" ? input : Number(input);
  if (!Number.isFinite(num)) throw httpError(400, "Amount must be a number");
  if (num <= 0) throw httpError(400, "Amount must be greater than zero");
  const cents = Math.round(num * 100);
  if (cents < 1) throw httpError(400, "Amount must be at least 0.01");
  if (cents > 100_000_000_00) throw httpError(400, "Amount too large");
  return cents;
}

export function generateAccountNumber() {
  let n = "";
  for (let i = 0; i < 10; i += 1) {
    n += Math.floor(Math.random() * 10).toString();
  }
  return n;
}

export function generateReference() {
  return (
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 8).toUpperCase()
  );
}
