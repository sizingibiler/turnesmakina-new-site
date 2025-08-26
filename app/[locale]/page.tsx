import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";
import { VideoHero } from "@/components/VideoHero";
import { Services3D } from "@/components/Services3D";
import { MachineShowcase } from "@/components/MachineShowcase";
import { FeatureCard } from "@/components/FeatureCard";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  
  return (
    <div>
      {/* Stunning Video Hero with Parallax */}
      <VideoHero dict={dict} locale={params.locale} />
      
      {/* 3D Animated Services */}
      <Services3D dict={dict} locale={params.locale} />
      
      {/* Interactive Machine Showcase */}
      <MachineShowcase dict={dict} locale={params.locale} />
      
      {/* Modern Features Grid with Glass Morphism */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <FeatureCard 
            title={dict.machinePark.title}
            items={dict.machinePark.items.slice(0, 4)}
            link={`/${params.locale}/makine-parkuru`}
            linkText={dict.nav.machine_park}
            gradient="from-blue-600/20 to-cyan-600/20"
            icon="🏭"
          />
          
          <FeatureCard 
            title={dict.quality.title}
            items={dict.quality.items.slice(0, 4)}
            link={`/${params.locale}/kalite`}
            linkText={dict.nav.quality}
            gradient="from-purple-600/20 to-pink-600/20"
            icon="✨"
          />
          
          <FeatureCard 
            title={dict.about.title}
            items={[dict.about.intro.substring(0, 150) + "..."]}
            link={`/${params.locale}/hakkimizda`}
            linkText={dict.nav.about}
            gradient="from-green-600/20 to-emerald-600/20"
            icon="🏢"
          />
        </div>
      </section>

      {/* Animated Stats Section with Gradient Background */}
      <section className="relative py-12 sm:py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-12 backdrop-blur-xl border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
              <div className="space-y-1 sm:space-y-3 transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">25+</div>
                <div className="text-xs sm:text-sm text-gray-300">{params.locale === 'tr' ? 'Yıllık Deneyim' : 'Years Experience'}</div>
              </div>
              <div className="space-y-1 sm:space-y-3 transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">13+</div>
                <div className="text-xs sm:text-sm text-gray-300">{params.locale === 'tr' ? 'CNC Makine' : 'CNC Machines'}</div>
              </div>
              <div className="space-y-1 sm:space-y-3 transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">100%</div>
                <div className="text-xs sm:text-sm text-gray-300">{params.locale === 'tr' ? 'Kalite Odaklı' : 'Quality Focused'}</div>
              </div>
              <div className="space-y-1 sm:space-y-3 transform hover:scale-110 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-xs sm:text-sm text-gray-300">{params.locale === 'tr' ? 'Destek' : 'Support'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section with Background Video */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover opacity-20" src="/assets/turnes/footer/footer.mp4" autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/60 via-blue-600/60 to-purple-600/60" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6">
            {params.locale === 'tr' ? 'Projeniz için Çözüm Üretelim' : 'Let\'s Create Solutions for Your Project'}
          </h2>
          <p className="text-base sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto opacity-90 px-4">
            {params.locale === 'tr' 
              ? 'Havacılık ve savunma sanayiinin en kritik projelerinde çözüm ortağınız'
              : 'Your solution partner in the most critical projects of aerospace and defense industry'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link 
              href={`/${params.locale}/iletisim`} 
              className="group relative w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 overflow-hidden rounded-full bg-white text-gray-900 font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {dict.nav.contact}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href={`/${params.locale}/makine-parkuru`}
              className="w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-full border-2 border-white bg-transparent text-white font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              {params.locale === 'tr' ? 'Makinelerimizi Görün' : 'See Our Machines'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

