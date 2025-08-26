"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface Item {
  name: string;
  image: string;
}

const items: Item[] = [
  { name: "Cincom Citizen L20", image: "/assets/turnes/machines/cincom-citizen-l20.avif" },
  { name: "Feeler Freze", image: "/assets/turnes/machines/feeler-freze.avif" },
  { name: "MANURHIN KMX", image: "/assets/turnes/machines/manurhin-kmx.avif" },
  { name: "Nakamura Tome TMC-15", image: "/assets/turnes/machines/nakamura-tome-tmc-15.avif" },
  { name: "STAR SR-16", image: "/assets/turnes/machines/star-sr-16.avif" },
  { name: "STAR SR-32", image: "/assets/turnes/machines/star-sr-32.avif" },
  { name: "Takisawa TX-20G", image: "/assets/turnes/machines/takisawa-tx-20g.avif" },
  { name: "Traub TNK 36", image: "/assets/turnes/machines/traub-tnk-36.avif" },
];

export function MachineParkGrid() {
  return (
    <section className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-800/40 border border-white/10"
          >
            <div className="relative w-full aspect-[4/3]">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">{m.name}</h3>
              <span className="text-xs text-cyan-300 opacity-80">CNC</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

