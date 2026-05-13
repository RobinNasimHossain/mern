import { formatCurrency } from "../api.js";

const typeMeta = {
  deposit: { label: "Deposit", sign: "+", color: "text-emerald-600" },
  withdrawal: { label: "Withdrawal", sign: "-", color: "text-rose-600" },
  transfer_in: { label: "Transfer in", sign: "+", color: "text-emerald-600" },
  transfer_out: { label: "Transfer out", sign: "-", color: "text-rose-600" },
};

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function TransactionList({ transactions, currency = "USD" }) {
  if (!transactions?.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        No transactions yet.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {transactions.map((tx) => {
        const meta = typeMeta[tx.type] || {
          label: tx.type,
          sign: "",
          color: "text-slate-700",
        };
        return (
          <li
            key={tx.id}
            className="flex items-center justify-between gap-4 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {meta.label}
                {tx.counterAccountNumber
                  ? ` · •••• ${tx.counterAccountNumber.slice(-4)}`
                  : ""}
              </p>
              <p className="truncate text-xs text-slate-500">
                {tx.description || "—"}
              </p>
              <p className="text-xs text-slate-400">{formatDate(tx.createdAt)}</p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${meta.color}`}>
                {meta.sign}
                {formatCurrency(tx.amount, currency)}
              </p>
              <p className="text-xs text-slate-400">
                Bal {formatCurrency(tx.balanceAfter, currency)}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
