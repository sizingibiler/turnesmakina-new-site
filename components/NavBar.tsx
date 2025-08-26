"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LangSwitcher } from "./LangSwitcher";
import { Menu, X } from "lucide-react";

import type { Locale } from "@/lib/i18n";

export function NavBar({ locale, dict }: { locale: Locale; dict: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled || isMobileMenuOpen ? "rgba(10, 10, 20, 0.95)" : "transparent",
          backdropFilter: isScrolled || isMobileMenuOpen ? "blur(10px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20 md:h-24 transition-[height] duration-300">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center z-50">
            <Image 
              src="/assets/turnes/logo.png"
              alt="Turnes Makina Logo"
              width={160}
              height={48}
              priority
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transform hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="relative text-base lg:text-lg font-medium text-white hover:text-cyan-400 transition-colors duration-300">
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

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <LangSwitcher locale={locale} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Background overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-full sm:w-80 bg-gradient-to-b from-gray-900 to-black border-l border-white/10"
            >
              <nav className="flex flex-col gap-2 p-6 pt-24">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30'
                          : 'text-white hover:bg-white/10 hover:text-cyan-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Switcher */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className="px-4">
                    <p className="text-sm text-gray-400 mb-3">
                      {locale === 'tr' ? 'Dil Seçimi' : locale === 'de' ? 'Sprache' : 'Language'}
                    </p>
                    <LangSwitcher locale={locale} />
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

