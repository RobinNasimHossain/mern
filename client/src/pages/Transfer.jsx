import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, extractError, formatCurrency } from "../api.js";

export default function Transfer() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    fromAccountId: "",
    toAccountNumber: "",
    amount: "",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api
      .get("/accounts")
      .then(({ data }) => {
        setAccounts(data.accounts);
        if (data.accounts[0]) {
          setForm((f) => ({ ...f, fromAccountId: data.accounts[0].id }));
        }
      })
      .catch((err) => setError(extractError(err, "Unable to load accounts")));
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      const { data } = await api.post("/transactions/transfer", {
        fromAccountId: form.fromAccountId,
        toAccountNumber: form.toAccountNumber.trim(),
        amount: Number(form.amount),
        description: form.description,
      });
      setSuccess(
        `Sent ${formatCurrency(
          Number(form.amount),
          data.fromAccount.currency
        )} to •••• ${data.toAccount.accountNumber.slice(-4)} · Ref ${
          data.reference
        }`
      );
      setForm({ ...form, toAccountNumber: "", amount: "", description: "" });
    } catch (err) {
      setError(extractError(err, "Transfer failed"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <div className="card">
        <h1 className="text-2xl font-semibold text-slate-900">Transfer money</h1>
        <p className="mt-1 text-sm text-slate-500">
          Move funds between your own accounts or to any Shoreline Bank account.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="from">
              From account
            </label>
            <select
              id="from"
              className="input"
              value={form.fromAccountId}
              onChange={(e) => update("fromAccountId", e.target.value)}
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
            <label className="label" htmlFor="to">
              To account number
            </label>
            <input
              id="to"
              className="input font-mono"
              inputMode="numeric"
              placeholder="10-digit account number"
              value={form.toAccountNumber}
              onChange={(e) => update("toAccountNumber", e.target.value)}
              required
              minLength={6}
              maxLength={20}
            />
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
              value={form.amount}
              onChange={(e) => update("amount", e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="description">
              Memo (optional)
            </label>
            <input
              id="description"
              type="text"
              maxLength={140}
              className="input"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
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
              disabled={submitting || !form.fromAccountId}
            >
              {submitting ? "Sending…" : "Send transfer"}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
