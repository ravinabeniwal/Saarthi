"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SignInControl from "./SignInControl";

const links = [
  { href: "/classroom", label: "Classroom" },
  { href: "/transcript", label: "Transcript" },
  { href: "/insights", label: "Insights" },
  { href: "/summary", label: "Summary" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/8 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-600">
            <Sparkles size={18} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-navy-900">
            Saarthi
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm text-mist transition-colors hover:text-navy-900",
                pathname === l.href && "bg-navy-900/5 text-navy-900"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SignInControl />
          <Link
            href="/live"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-navy-950 transition-transform hover:scale-[1.03]"
          >
            Enter Live Room
          </Link>
        </div>
      </nav>
    </header>
  );
}
