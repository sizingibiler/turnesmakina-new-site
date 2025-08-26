"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, Maximize2, Cpu, Gauge, Zap } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Machine {
  id: number;
  name: string;
  model: string;
  image: string;
  specs: {
    axes: string;
    precision: string;
    speed: string;
    power: string;
  };
  description: string;
  features: string[];
}

export function MachineShowcase({ dict, locale }: { dict: any; locale: string }) {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const machines: Machine[] = [
    {
      id: 1,
      name: "Cincom Citizen L20",
      model: "Sliding Head Lathe",
      image: "/assets/turnes/machines/cincom-citizen-l20.avif",
      specs: { axes: "Multi", precision: "±0.002mm", speed: "—", power: "—" },
      description: locale === 'tr' ? 'Kayar otomat yüksek hassasiyet' : 'High precision sliding head lathe',
      features: [
        locale === 'tr' ? 'Karmaşık parçalar' : 'Complex parts',
        locale === 'tr' ? 'Sabit kalite' : 'Consistent quality',
        locale === 'tr' ? 'Verimli üretim' : 'Efficient production',
      ]
    },
    {
      id: 2,
      name: "Traub TNK 36",
      model: "CNC Lathe",
      image: "/assets/turnes/machines/traub-tnk-36.avif",
      specs: { axes: "—", precision: "±0.005mm", speed: "—", power: "—" },
      description: locale === 'tr' ? 'Güvenilir yatay torna' : 'Reliable horizontal lathe',
      features: [
        locale === 'tr' ? 'Yüksek tekrarlanabilirlik' : 'High repeatability',
        locale === 'tr' ? 'Stabil performans' : 'Stable performance',
        locale === 'tr' ? 'Geniş yelpaze' : 'Wide range',
      ]
    },
    {
      id: 3,
      name: "Takisawa TX-20G",
      model: "Lathe",
      image: "/assets/turnes/machines/takisawa-tx-20g.avif",
      specs: { axes: "—", precision: "±0.01mm", speed: "—", power: "—" },
      description: locale === 'tr' ? 'Hassas tornalama' : 'Precision turning',
      features: [
        locale === 'tr' ? 'Yüksek yüzey kalitesi' : 'High surface quality',
        locale === 'tr' ? 'Dayanıklı yapı' : 'Durable build',
        locale === 'tr' ? 'Kararlı işlem' : 'Stable process',
      ]
    },
    {
      id: 4,
      name: "STAR SR-16",
      model: "Sliding Head",
      image: "/assets/turnes/machines/star-sr-16.avif",
      specs: { axes: "—", precision: "±0.003mm", speed: "—", power: "—" },
      description: locale === 'tr' ? 'Kompakt ve seri üretim' : 'Compact for series production',
      features: [
        locale === 'tr' ? 'Hızlı çevrim' : 'Fast cycle',
        locale === 'tr' ? 'Stabilite' : 'Stability',
        locale === 'tr' ? 'Düşük tolerans' : 'Tight tolerance',
      ]
    },
    {
      id: 5,
      name: "MANURHIN KMX",
      model: "Sliding Head",
      image: "/assets/turnes/machines/manurhin-kmx.avif",
      specs: { axes: "—", precision: "±0.003mm", speed: "—", power: "—" },
      description: locale === 'tr' ? 'Kayar otomat' : 'Sliding head lathe',
      features: [
        locale === 'tr' ? 'Çok amaçlı' : 'Versatile',
        locale === 'tr' ? 'Kesintisiz üretim' : 'Continuous production',
        locale === 'tr' ? 'Güvenilir' : 'Reliable',
      ]
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-semibold text-lg tracking-wider uppercase">
            {locale === 'tr' ? 'MAKİNE PARKURUMUZ' : 'OUR MACHINE PARK'}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mt-4 mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {locale === 'tr' ? 'İleri Teknoloji' : 'Advanced Technology'}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {locale === 'tr'
              ? '13 adet son teknoloji CNC makine ile havacılık ve savunma sanayinin en karmaşık parçalarını üretiyoruz.'
              : 'We produce the most complex parts for aerospace and defense industry with 13 state-of-the-art CNC machines.'}
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative">
          <Swiper
            ref={swiperRef}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="!pb-12"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {machines.map((machine, index) => (
              <SwiperSlide key={machine.id} className="!w-[600px] !h-[400px]">
                <motion.div
                  className="relative h-full rounded-3xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedMachine(machine)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Machine Image */}
                  <Image
                    src={machine.image}
                    alt={machine.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 600px"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-2xl font-bold text-white mb-2">{machine.name}</h3>
                    <p className="text-cyan-400 mb-4">{machine.model}</p>
                    
                    {/* Quick Specs */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-400">{locale === 'tr' ? 'Eksen' : 'Axes'}</div>
                        <div className="text-sm font-bold text-white">{machine.specs.axes}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">{locale === 'tr' ? 'Hassasiyet' : 'Precision'}</div>
                        <div className="text-sm font-bold text-white">{machine.specs.precision}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">{locale === 'tr' ? 'Hız' : 'Speed'}</div>
                        <div className="text-sm font-bold text-white">{machine.specs.speed}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400">{locale === 'tr' ? 'Güç' : 'Power'}</div>
                        <div className="text-sm font-bold text-white">{machine.specs.power}</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <Maximize2 size={16} />
                      <span className="text-sm font-semibold">
                        {locale === 'tr' ? 'Detayları Görüntüle' : 'View Details'}
                      </span>
                    </motion.button>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>

        {/* Active Machine Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Gauge className="text-cyan-400" size={20} />
            <span className="text-white font-medium">
              {machines[activeIndex]?.name} - {machines[activeIndex]?.description}
            </span>
            <Zap className="text-yellow-400" size={20} />
          </div>
        </motion.div>
      </div>

      {/* Modal for Machine Details */}
      <AnimatePresence>
        {selectedMachine && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMachine(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-3xl w-full bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMachine(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                ×
              </button>

              <h3 className="text-3xl font-bold text-white mb-2">{selectedMachine.name}</h3>
              <p className="text-cyan-400 mb-6">{selectedMachine.model}</p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {locale === 'tr' ? 'Teknik Özellikler' : 'Technical Specifications'}
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(selectedMachine.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-white/10">
                        <span className="text-gray-400 capitalize">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">
                    {locale === 'tr' ? 'Özellikler' : 'Features'}
                  </h4>
                  <ul className="space-y-2">
                    {selectedMachine.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
