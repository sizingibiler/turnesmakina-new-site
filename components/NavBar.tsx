"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LangSwitcher } from "./LangSwitcher";

export function NavBar({ locale, dict }: { locale: string; dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe fallback for navigation labels
  const defaultNav = {
    home: locale === 'tr' ? 'Ana Sayfa' : 'Home',
    about: locale === 'tr' ? 'Hakkımızda' : 'About Us',
    products: locale === 'tr' ? 'Ürünler' : 'Products',
    contact: locale === 'tr' ? 'İletişim' : 'Contact'
  };
  
  const nav = dict?.nav || defaultNav;

  const navItems = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/hakkimizda`, label: nav.about },
    { href: `/${locale}/urunler`, label: nav.products },
    { href: `/${locale}/iletisim`, label: nav.contact },
  ];

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled ? "rgba(10, 10, 20, 0.6)" : "transparent",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20 md:h-24 transition-[height] duration-300">
        <Link href={`/${locale}`} className="flex items-center">
          <Image 
            src="/assets/turnes/logo.png"
            alt="Turnes Makina Logo"
            width={160}
            height={48}
            priority
            className="h-10 sm:h-12 w-auto object-contain transform hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative text-lg font-medium text-white hover:text-cyan-400 transition-colors duration-300">
              {item.label}
              {pathname === item.href && (
                <motion.div 
                  layoutId="active-nav-link"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <LangSwitcher locale={locale} />
      </div>
    </motion.header>
  );
}

