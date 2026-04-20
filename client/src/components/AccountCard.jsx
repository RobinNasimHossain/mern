import { Link } from "react-router-dom";
import { formatCurrency } from "../api.js";

const typeLabels = {
  checking: "Checking",
  savings: "Savings",
};

const typeBadges = {
  checking: "bg-brand-50 text-brand-700",
  savings: "bg-emerald-50 text-emerald-700",
};

export default function AccountCard({ account }) {
  return (
    <Link
      to={`/accounts/${account.id}`}
      className="card group flex flex-col gap-4 transition hover:border-brand-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{account.name}</p>
          <p className="font-mono text-xs text-slate-400">
            •••• {account.accountNumber.slice(-4)}
          </p>
        </div>
        <span className={`pill ${typeBadges[account.type] || "bg-slate-100"}`}>
          {typeLabels[account.type] || account.type}
        </span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Available balance
        </p>
        <p className="mt-1 text-2xl font-semibold text-slate-900">
          {formatCurrency(account.balance, account.currency)}
        </p>
      </div>
      <p className="text-xs text-brand-600 opacity-0 transition group-hover:opacity-100">
        View transactions →
      </p>
    </Link>
  );
}
