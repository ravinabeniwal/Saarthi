"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, FileText, LineChart, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/live", label: "Live", icon: Radio },
  { href: "/transcript", label: "Transcript", icon: FileText },
  { href: "/insights", label: "Insights", icon: LineChart },
  { href: "/summary", label: "Summary", icon: FileCheck2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center gap-2 border-r border-white/5 py-6 md:flex">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
              active ? "bg-cyan-400/15 text-cyan-300" : "text-mist/50 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={18} />
          </Link>
        );
      })}
    </aside>
  );
}
