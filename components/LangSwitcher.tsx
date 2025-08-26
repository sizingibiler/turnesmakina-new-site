"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1).join("/");
  const langs: { code: Locale; label: string; flag: string }[] = [
    { code: "tr", label: "TR", flag: "TR" },
    { code: "en", label: "EN", flag: "EN" },
    { code: "de", label: "DE", flag: "DE" },
  ];
  return (
    <div className="flex items-center gap-2">
      {langs.map(l => {
        const target = `/${l.code}/${rest}`.replace(/\/$/, "");
        const isActive = l.code === locale;
        return (
          <Link key={l.code} href={target} className={`text-sm px-3 py-2 rounded-full font-medium flex items-center gap-2 transition-all ${isActive ? 'bg-white/20' : 'glass hover:bg-white/10'}`}>
            <span className="text-lg">{l.flag}</span>
            <span>{l.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

