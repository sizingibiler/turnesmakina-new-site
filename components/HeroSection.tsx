"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection({ dict, locale }: { dict: any; locale: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient opacity-80" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-50" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20">
        <h1 
          className={`text-5xl md:text-7xl lg:text-8xl font-black mb-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
            {dict.hero.title}
          </span>
        </h1>
        
        <p 
          className={`text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {dict.hero.subtitle}
        </p>
        
        <div 
          className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <Link 
            href={`/${locale}/makine-parkuru`}
            className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center gap-2">
              {dict.nav.machine_park}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </Link>
          
          <Link 
            href={`/${locale}/iletisim`}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
