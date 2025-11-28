"use client";

import { useState } from "react";
import { useApp } from "../providers/AppProvider";

export default function AuthPanel() {
  const {
    user,
    hydrated,
    authError,
    signIn,
    signUp,
    signOut,
    sendReset,
    changePassword,
    setLoading,
    loading,
  } = useApp();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeStatus, setChangeStatus] = useState("");
  const [changing, setChanging] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const emailIsValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const passwordIsValid = (val) => val.length >= 8 && !/[<>]/.test(val);

  if (!hydrated) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    if (!emailIsValid(email)) {
      setStatus("Enter a valid email address.");
      return;
    }
    if (mode !== "reset" && !passwordIsValid(password)) {
      setStatus("Password must be at least 8 characters and cannot contain < or >.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email, password);
        setStatus("Signed in.");
      } else if (mode === "signup") {
        await signUp(email, password);
        setStatus("Account created. Check email if confirmation is required.");
      } else if (mode === "reset") {
        await sendReset(email);
        setStatus("Password reset email sent.");
      }
    } catch (err) {
      setStatus(err?.message || "Auth error");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setChangeStatus("");
    if (!passwordIsValid(newPassword)) {
      setChangeStatus("Password must be at least 8 characters and cannot contain < or >.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangeStatus("Passwords do not match.");
      return;
    }
    setChanging(true);
    try {
      await changePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setChangeStatus("Password updated.");
    } catch (err) {
      setChangeStatus(err?.message || "Password update failed.");
    } finally {
      setChanging(false);
    }
  }

  return (
    <section className="card" style={{ marginTop: 12 }}>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          {user ? (
            <>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                You’re signed in—favorites and shopping list stay synced to your account.
              </p>
              <p className="font-semibold mt-1 text-sm">{user.email}</p>
            </>
          ) : (
            <>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Sign in to save recipes and build your shopping list.
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Email/password with reset support via Supabase.
              </p>
            </>
          )}
        </div>
        {user && (
          <button
            onClick={signOut}
            className="text-sm px-3 py-2 rounded-md"
            style={{ background: "rgba(255,0,0,0.1)", color: "#b91c1c" }}
          >
            Log out
          </button>
        )}
      </div>

      {!user && (
        <div className="mt-4">
          <div className="flex gap-2 text-sm mb-3 flex-wrap">
            {[
              ["signin", "Sign in"],
              ["signup", "Sign up"],
              ["reset", "Reset password"],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  setMode(value);
                  setStatus("");
                }}
                className="px-3 py-1 rounded-md border"
                style={{
                  borderColor: value === mode ? "var(--accent)" : "var(--border)",
                  background: value === mode ? "var(--accent)" : "transparent",
                  color: value === mode ? "#000" : "var(--text)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md px-3 py-2 text-sm"
              style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
            />
            {mode !== "reset" && (
              <div className="flex items-center gap-2">
                <input
                  type={showAuthPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border rounded-md px-3 py-2 text-sm flex-1"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                    color: "var(--text)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowAuthPassword((p) => !p)}
                  className="text-xs px-2 py-2 rounded-md border"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  {showAuthPassword ? "Hide" : "Show"}
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="text-sm px-4 py-2 rounded-md text-white"
              style={{ background: "var(--accent)" }}
            >
              {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset email"}
            </button>
          </form>
          {(status || authError) && (
            <p className="mt-2 text-sm" style={{ color: "#b91c1c" }}>
              {status || authError}
            </p>
          )}
        </div>
      )}

      {user ? (
        <div className="mt-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
          <p className="font-semibold text-sm mb-2">Change password</p>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-2 max-w-md">
            <div className="flex items-center gap-2">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="border rounded-md px-3 py-2 text-sm flex-1"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((p) => !p)}
                className="text-xs px-2 py-2 rounded-md border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="border rounded-md px-3 py-2 text-sm flex-1"
                style={{ borderColor: "var(--border)", background: "var(--card)", color: "var(--text)" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="text-xs px-2 py-2 rounded-md border"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              disabled={changing}
              className="text-sm px-4 py-2 rounded-md text-white"
              style={{ background: "var(--accent)" }}
            >
              {changing ? "Updating..." : "Update password"}
            </button>
          </form>
          {changeStatus && (
            <p className="mt-2 text-sm" style={{ color: changeStatus.includes("updated") ? "green" : "#b91c1c" }}>
              {changeStatus}
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
