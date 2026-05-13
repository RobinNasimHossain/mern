import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, extractError, formatCurrency } from "../api.js";
import TransactionList from "../components/TransactionList.jsx";

export default function AccountDetail() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const [accountRes, txRes] = await Promise.all([
          api.get(`/accounts/${id}`),
          api.get(`/accounts/${id}/transactions`, {
            params: { limit: 50 },
          }),
        ]);
        if (cancelled) return;
        setAccount(accountRes.data.account);
        setTransactions(txRes.data.transactions);
        setError("");
      } catch (err) {
        if (!cancelled) setError(extractError(err, "Unable to load account"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-sm text-slate-500">Loading account…</p>;
  }
  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
  }
  if (!account) return null;

  return (
    <div className="space-y-6">
      <div>
        <Link to="/" className="text-sm text-brand-600 hover:underline">
          ← Back to dashboard
        </Link>
      </div>
      <div className="card flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {account.type === "savings" ? "Savings" : "Checking"}
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">
            {account.name}
          </h1>
          <p className="mt-1 font-mono text-sm text-slate-500">
            Account #{account.accountNumber}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Available balance
          </p>
          <p className="text-3xl font-semibold text-slate-900">
            {formatCurrency(account.balance, account.currency)}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Recent transactions
        </h2>
        <TransactionList
          transactions={transactions}
          currency={account.currency}
        />
      </div>
    </div>
  );
}
