"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Cpu, Zap, Shield, Cog, Wrench, Settings } from "lucide-react";

function AnimatedSphere({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  color: string;
}

function ServiceCard({ title, description, icon, index, color }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{
          rotateY: isHovered ? 10 : 0,
          z: isHovered ? 50 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div className="relative group h-full backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 border border-white/10 overflow-hidden">
          {/* Animated gradient background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${color}40 0%, transparent 70%)`,
            }}
          />
          
          {/* 3D Canvas Background */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
              <Environment preset="city" />
              <AnimatedSphere color={color} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl flex items-center justify-center mb-6 border border-white/20"
              style={{
                boxShadow: isHovered ? `0 20px 40px ${color}50` : "0 10px 20px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ color }}>{icon}</div>
            </motion.div>

            <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
            <p className="text-gray-300 leading-relaxed">{description}</p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(to right, ${color}, ${color}80)`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services3D({ dict, locale }: { dict: any; locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const services = [
    {
      title: locale === 'tr' ? 'CNC Torna' : 'CNC Turning',
      description: locale === 'tr' 
        ? 'Yüksek hassasiyetli CNC torna tezgahlarımızla karmaşık parçaları üretiyoruz.'
        : 'We produce complex parts with our high-precision CNC lathes.',
      icon: <Cog size={32} />,
      color: '#06b6d4', // cyan-500
    },
    {
      title: locale === 'tr' ? 'CNC Freze' : 'CNC Milling',
      description: locale === 'tr'
        ? '3, 4 ve 5 eksenli CNC freze makinelerimizle hassas işleme yapıyoruz.'
        : 'Precise machining with our 3, 4 and 5-axis CNC milling machines.',
      icon: <Settings size={32} />,
      color: '#3b82f6', // blue-500
    },
    {
      title: locale === 'tr' ? 'Tel Erezyon' : 'Wire EDM',
      description: locale === 'tr'
        ? 'Sert metallerde ve karmaşık geometrilerde hassas kesim işlemleri.'
        : 'Precise cutting operations on hard metals and complex geometries.',
      icon: <Zap size={32} />,
      color: '#8b5cf6', // violet-500
    },
    {
      title: locale === 'tr' ? 'Kalite Kontrol' : 'Quality Control',
      description: locale === 'tr'
        ? '3D CMM ölçüm cihazlarımızla %100 kalite garantisi sağlıyoruz.'
        : 'We ensure 100% quality guarantee with our 3D CMM measuring devices.',
      icon: <Shield size={32} />,
      color: '#10b981', // emerald-500
    },
    {
      title: locale === 'tr' ? 'Prototipleme' : 'Prototyping',
      description: locale === 'tr'
        ? 'Hızlı prototip üretimi ve tasarım doğrulama hizmetleri.'
        : 'Rapid prototype production and design verification services.',
      icon: <Cpu size={32} />,
      color: '#f59e0b', // amber-500
    },
    {
      title: locale === 'tr' ? 'Montaj' : 'Assembly',
      description: locale === 'tr'
        ? 'Komple montaj ve test hizmetleri ile teslim edilmeye hazır ürünler.'
        : 'Ready-to-deliver products with complete assembly and testing services.',
      icon: <Wrench size={32} />,
      color: '#ef4444', // red-500
    },
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <motion.div
          style={{ y: springY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse animation-delay-2000" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity, scale: springScale }}
        className="relative z-10 container mx-auto px-6"
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-cyan-400 font-semibold text-lg tracking-wider uppercase mb-4 block">
              {locale === 'tr' ? 'HİZMETLERİMİZ' : 'OUR SERVICES'}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {locale === 'tr' ? 'Hassas İmalat' : 'Precision Manufacturing'}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {locale === 'tr' 
                ? 'En son teknoloji CNC makinelerimiz ve uzman ekibimizle, havacılık ve savunma sanayine yönelik yüksek hassasiyetli parçalar üretiyoruz.'
                : 'With our state-of-the-art CNC machines and expert team, we produce high-precision parts for the aerospace and defense industry.'}
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
              color={service.color}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <a
            href={`/${locale}/makine-parkuru`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg rounded-full hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
          >
            {locale === 'tr' ? 'Makine Parkurumuz' : 'Our Machine Park'}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
