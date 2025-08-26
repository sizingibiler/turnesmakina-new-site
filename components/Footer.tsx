"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer({ locale, dict }: { locale: string; dict: any }) {
  // Safe fallback for navigation labels
  const defaultNav = {
    about: locale === 'tr' ? 'Hakkımızda' : 'About Us',
    products: locale === 'tr' ? 'Ürünler' : 'Products', 
    contact: locale === 'tr' ? 'İletişim' : 'Contact',
    gallery: locale === 'tr' ? 'Galeri' : 'Gallery'
  };
  
  const nav = dict?.nav || defaultNav;
  
  const navItems = [
    { href: `/${locale}/hakkimizda`, label: nav.about },
    { href: `/${locale}/urunler`, label: nav.products },
    { href: `/${locale}/iletisim`, label: nav.contact },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: <Facebook /> },
    { href: "https://instagram.com", icon: <Instagram /> },
    { href: "https://linkedin.com", icon: <Linkedin /> },
    { href: "https://twitter.com", icon: <Twitter /> },
  ];

  return (
    <footer className="relative bg-gray-900 text-white pt-24 pb-8 overflow-hidden">
      {/* Background footer video (muted loop) */}
      <video 
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-10"
        src="/assets/turnes/footer/footer.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Link href={`/${locale}`}>
              <Image 
                src="/assets/turnes/logo.png"
                alt="Turnes Makina Logo"
                width={180}
                height={54}
                className="mb-4 object-contain"
              />
            </Link>
            <p className="text-gray-400">
              {dict?.about?.description ? dict.about.description.substring(0, 100) + '...' : 
               (locale === 'tr' ? 'Hassas imalat ve kaliteli hizmet...' : 'Precision manufacturing and quality service...')}
            </p>
          </motion.div>

          {/* Links Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-xl font-bold mb-6">{locale === 'tr' ? 'Hızlı Linkler' : 'Quick Links'}</h3>
            <ul className="space-y-3">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-400 transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h3 className="text-xl font-bold mb-6">{nav.contact}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Demirci Mh. Sarıtoprak Sk. No:13 Nilüfer/BURSA</li>
              <li>+90 544 282 19 75</li>
              <li>turnes@turnesmakina.com</li>
            </ul>
          </motion.div>

          {/* Social Column */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-6">{locale === 'tr' ? 'Bizi Takip Edin' : 'Follow Us'}</h3>
            <div className="flex gap-6">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 hover:scale-110 transition-all duration-300">
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Turnes Makina. {dict?.footer?.rights || (locale === 'tr' ? 'Tüm hakları saklıdır' : 'All rights reserved')}.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">{dict?.footer?.privacy || (locale === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy')}</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors">{dict?.footer?.terms || (locale === 'tr' ? 'Kullanım Koşulları' : 'Terms of Service')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

