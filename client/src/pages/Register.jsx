import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { extractError } from "../api.js";

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/" replace />;

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setSubmitting(true);
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(extractError(err, "Unable to create account"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card">
        <h1 className="text-2xl font-semibold text-slate-900">Open an account</h1>
        <p className="mt-1 text-sm text-slate-500">
          Get a Shoreline Bank checking account in under a minute.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              className="input"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="input"
              value={form.password}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs text-slate-500">
              At least 8 characters.
            </p>
          </div>
          {error ? (
            <p className="text-sm text-rose-600">{error}</p>
          ) : null}
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={submitting}
          >
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already a customer?{" "}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
