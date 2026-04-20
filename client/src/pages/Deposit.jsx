import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, extractError, formatCurrency } from "../api.js";

export default function Deposit() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get("/accounts")
      .then(({ data }) => {
        setAccounts(data.accounts);
        if (data.accounts[0]) setAccountId(data.accounts[0].id);
      })
      .catch((err) => setError(extractError(err, "Unable to load accounts")));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const { data } = await api.post("/transactions/deposit", {
        accountId,
        amount: Number(amount),
        description,
      });
      setSuccess(
        `Deposited ${formatCurrency(
          Number(amount),
          data.account.currency
        )}. New balance: ${formatCurrency(
          data.account.balanceCents / 100,
          data.account.currency
        )}.`
      );
      setAmount("");
      setDescription("");
    } catch (err) {
      setError(extractError(err, "Deposit failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="card">
        <h1 className="text-2xl font-semibold text-slate-900">Deposit funds</h1>
        <p className="mt-1 text-sm text-slate-500">
          Add money to one of your accounts.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="account">
              To account
            </label>
            <select
              id="account"
              className="input"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              required
            >
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} · •••• {a.accountNumber.slice(-4)} ·{" "}
                  {formatCurrency(a.balance, a.currency)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              required
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="description">
              Note (optional)
            </label>
            <input
              id="description"
              type="text"
              maxLength={140}
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {success ? (
            <p className="text-sm text-emerald-600">{success}</p>
          ) : null}
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={submitting || !accountId}
            >
              {submitting ? "Depositing…" : "Deposit"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
