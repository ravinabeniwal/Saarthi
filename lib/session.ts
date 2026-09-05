"use client";

// Saarthi has no database or auth backend — this is a deliberately light
// adaptation of "teacher/student login": a named local session, not a
// secured account system. It lets the Navbar show who's "signed in" and
// pre-fills the existing CreateClassroom / JoinClassroom forms.

export interface SaarthiSession {
  name: string;
  role: "teacher" | "student";
}

const KEY = "saarthi_session";
type Listener = () => void;
const listeners = new Set<Listener>();

function read(): SaarthiSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SaarthiSession) : null;
  } catch {
    return null;
  }
}

let cached = read();

export const sessionStore = {
  getSnapshot(): SaarthiSession | null {
    return cached;
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  signIn(session: SaarthiSession) {
    cached = session;
    window.localStorage.setItem(KEY, JSON.stringify(session));
    listeners.forEach((l) => l());
  },
  signOut() {
    cached = null;
    window.localStorage.removeItem(KEY);
    listeners.forEach((l) => l());
  },
};
