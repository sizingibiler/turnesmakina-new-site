"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1).join("/");
  const langs: { code: Locale; label: string; flagSrc: string }[] = [
    { code: "tr", label: "TR", flagSrc: "/icons/tr.svg" },
    { code: "en", label: "EN", flagSrc: "/icons/en.svg" },
    { code: "de", label: "DE", flagSrc: "/icons/de.svg" },
  ];
  return (
    <div className="flex items-center gap-2">
      {langs.map(l => {
        const target = `/${l.code}/${rest}`.replace(/\/$/, "");
        const isActive = l.code === locale;
        return (
          <Link 
            key={l.code} 
            href={target} 
            className={`text-sm px-3 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
              isActive 
                ? 'bg-white/20 shadow-lg border border-white/20' 
                : 'glass hover:bg-white/10 border border-white/10'
            }`}
          >
            <Image 
              src={l.flagSrc} 
              alt={`${l.label} flag`} 
              width={20} 
              height={14} 
              className="rounded-sm shadow-sm"
            />
            <span className="text-white font-semibold">{l.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

