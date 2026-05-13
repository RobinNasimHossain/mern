import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, extractError, formatCurrency } from "../api.js";
import AccountCard from "../components/AccountCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openingAccount, setOpeningAccount] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: "savings",
    name: "Savings",
  });

  async function refresh() {
    setLoading(true);
    try {
      const { data } = await api.get("/accounts");
      setAccounts(data.accounts);
      setError("");
    } catch (err) {
      setError(extractError(err, "Unable to load accounts"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleOpenAccount(e) {
    e.preventDefault();
    setOpeningAccount(true);
    try {
      await api.post("/accounts", newAccount);
      setNewAccount({ type: "savings", name: "Savings" });
      await refresh();
    } catch (err) {
      setError(extractError(err, "Unable to open account"));
    } finally {
      setOpeningAccount(false);
    }
  }

  const total = accounts.reduce((sum, a) => sum + a.balanceCents, 0) / 100;
  const currency = accounts[0]?.currency || "USD";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Your money at a glance
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Total balance across all accounts:{" "}
            <span className="font-semibold text-slate-900">
              {formatCurrency(total, currency)}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/transfer" className="btn-primary">
            New transfer
          </Link>
          <Link to="/deposit" className="btn-secondary">
            Deposit
          </Link>
        </div>
      </div>

      {error ? <p className="text-sm text-rose-600">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-slate-500">Loading accounts…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}

      <div className="card max-w-xl">
        <h2 className="text-lg font-semibold text-slate-900">Open another account</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a savings or checking account in seconds.
        </p>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
          onSubmit={handleOpenAccount}
        >
          <div>
            <label className="label" htmlFor="new-name">
              Nickname
            </label>
            <input
              id="new-name"
              className="input"
              value={newAccount.name}
              onChange={(e) =>
                setNewAccount({ ...newAccount, name: e.target.value })
              }
              required
              maxLength={60}
            />
          </div>
          <div>
            <label className="label" htmlFor="new-type">
              Type
            </label>
            <select
              id="new-type"
              className="input"
              value={newAccount.type}
              onChange={(e) =>
                setNewAccount({ ...newAccount, type: e.target.value })
              }
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={openingAccount}>
            {openingAccount ? "Opening…" : "Open"}
          </button>
        </form>
      </div>
    </div>
  );
}
