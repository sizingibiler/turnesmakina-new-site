"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function VideoHero({ dict, locale }: { dict: any; locale: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optional hero video from env (if provided and appropriate)
  const heroVideo = process.env.NEXT_PUBLIC_HERO_VIDEO || '/assets/turnes/hero/hero.mp4';
  
  // Safe fallbacks
  const defaultNav = {
    about: locale === 'tr' ? 'Hakkımızda' : 'About Us',
    contact: locale === 'tr' ? 'İletişim' : 'Contact'
  };
  
  const defaultHero = {
    title: 'TURNES MAKİNA',
    subtitle: locale === 'tr' ? 'Hassas imalat ve kaliteli hizmet' : 'Precision manufacturing and quality service'
  };
  
  const nav = dict?.nav || defaultNav;
  const hero = dict?.hero || defaultHero;

  useEffect(() => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => console.log("Autoplay was prevented: ", error));
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background: prefer heroVideo if defined, otherwise high-quality photo from flat */}
      <div className="absolute inset-0 z-0">
        {heroVideo ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src={heroVideo}
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <>
            <Image
              src="/assets/turnes/hero/header.avif"
              alt="Turnes Makina Hero"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
          </>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <Image 
            src="/assets/turnes/logo.png"
            alt="Turnes Makina Logo"
            width={200}
            height={60}
            className="mx-auto h-12 w-auto object-contain"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-wider"
          style={{ textShadow: "0 4px 15px rgba(0,0,0,0.5)" }}
        >
          {hero.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href={`/${locale}/hakkimizda`} className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-cyan-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105">
            {nav.about}
          </Link>
          <Link href={`/${locale}/iletisim`} className="border-2 border-white/80 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            {nav.contact}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
