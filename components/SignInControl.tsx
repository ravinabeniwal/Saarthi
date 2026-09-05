"use client";

import { useState, useSyncExternalStore } from "react";
import { LogIn, LogOut, GraduationCap, User } from "lucide-react";
import { sessionStore } from "@/lib/session";

export default function SignInControl() {
  const session = useSyncExternalStore(
    sessionStore.subscribe,
    sessionStore.getSnapshot,
    () => null
  );
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("teacher");

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-navy-900/10 bg-navy-900/5 px-3 py-1.5 text-xs font-medium text-navy-900">
          {session.role === "teacher" ? <GraduationCap size={13} /> : <User size={13} />}
          {session.name}
        </span>
        <button
          onClick={() => sessionStore.signOut()}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-navy-900/15 px-3 py-1.5 text-xs font-medium text-navy-900 transition-colors hover:bg-navy-900/5"
      >
        <LogIn size={13} /> Sign in
      </button>
      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return;
            sessionStore.signIn({ name: name.trim(), role });
            setOpen(false);
          }}
          className="glass-strong absolute right-0 top-11 z-50 flex w-64 flex-col gap-3 rounded-2xl p-4"
        >
          <p className="text-xs font-medium text-navy-900">Quick sign in</p>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-navy-900/10 bg-white px-3 py-2 text-sm text-navy-900 outline-none focus:border-cyan-500/50"
          />
          <div className="flex gap-2">
            {(["teacher", "student"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  role === r
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-700"
                    : "border-navy-900/10 text-slate-500"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="rounded-full bg-cyan-500 py-2 text-sm font-medium text-navy-950"
          >
            Continue
          </button>
        </form>
      )}
    </div>
  );
}
