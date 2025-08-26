"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// Inline flag components for better Vercel compatibility
const TurkeyFlag = () => (
  <svg viewBox="0 0 900 600" className="w-5 h-4 rounded-sm shadow-sm">
    <rect width="900" height="600" fill="#E30A17"/>
    <circle cx="425" cy="300" r="120" fill="white"/>
    <circle cx="445" cy="300" r="96" fill="#E30A17"/>
    <polygon points="445,200 475,250 530,250 490,285 505,340 445,310 385,340 400,285 360,250 415,250" fill="white"/>
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 900 600" className="w-5 h-4 rounded-sm shadow-sm">
    <rect width="900" height="600" fill="#012169"/>
    <g fill="white">
      <polygon points="0,0 0,600 300,300"/>
      <polygon points="900,0 600,300 900,600"/>
      <polygon points="0,0 300,300 900,0"/>
      <polygon points="0,600 300,300 900,600"/>
    </g>
    <g fill="#C8102E">
      <polygon points="0,0 0,600 150,300"/>
      <polygon points="900,0 750,300 900,600"/>
      <polygon points="0,0 150,300 900,0"/>
      <polygon points="0,600 150,300 900,600"/>
    </g>
    <rect x="375" y="0" width="150" height="600" fill="white"/>
    <rect x="0" y="225" width="900" height="150" fill="white"/>
    <rect x="400" y="0" width="100" height="600" fill="#C8102E"/>
    <rect x="0" y="250" width="900" height="100" fill="#C8102E"/>
  </svg>
);

const GermanFlag = () => (
  <svg viewBox="0 0 900 600" className="w-5 h-4 rounded-sm shadow-sm">
    <rect width="900" height="200" fill="#000"/>
    <rect y="200" width="900" height="200" fill="#DD0000"/>
    <rect y="400" width="900" height="200" fill="#FFCE00"/>
  </svg>
);

export function LangSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1).join("/");
  const langs: { code: Locale; label: string; FlagComponent: React.ComponentType }[] = [
    { code: "tr", label: "TR", FlagComponent: TurkeyFlag },
    { code: "en", label: "EN", FlagComponent: UKFlag },
    { code: "de", label: "DE", FlagComponent: GermanFlag },
  ];
  return (
    <div className="flex items-center gap-2">
      {langs.map(l => {
        const target = `/${l.code}/${rest}`.replace(/\/$/, "");
        const isActive = l.code === locale;
        const { FlagComponent } = l;
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
            <FlagComponent />
            <span className="text-white font-semibold">{l.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

