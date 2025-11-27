"use client";

import { useState } from "react";
import supabase from "../../src/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("");
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setStatus("Password updated. You can close this tab and sign in.");
    } catch (err) {
      setStatus(err?.message || "Failed to update password.");
    }
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <p className="text-sm text-gray-600 mb-4">
        Enter a new password to finish resetting your account.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password"
          className="border rounded-md px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700"
        >
          Update password
        </button>
      </form>
      {status && <p className="mt-3 text-sm text-red-600">{status}</p>}
    </main>
  );
}
