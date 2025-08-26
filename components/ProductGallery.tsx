"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

const products = [
  { id: 1, category: 'steel', name: 'Hassas İşlenmiş Parçalar', image: '/assets/turnes/products/product1.jpg' },
  { id: 2, category: 'aluminum', name: 'Alüminyum Bileşenler', image: '/assets/turnes/products/product2.jpg' },
  { id: 3, category: 'steel', name: 'Özel Bağlantı Elemanları', image: '/assets/turnes/products/product3.jpg' },
  { id: 4, category: 'aluminum', name: 'Dişli ve Parçalar', image: '/assets/turnes/products/product4.jpg' },
];

const filters = [
  { id: 'all', name: 'Tümü' },
  { id: 'steel', name: 'Çelik' },
  { id: 'aluminum', name: 'Alüminyum' },
  { id: 'titanium', name: 'Titanyum' },
];

export function ProductGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-12">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
              onClick={() => setSelectedImage(product.image)}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-0" />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <h3 className="text-white font-bold text-lg">
                  {product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative"
            >
              <Image
                src={selectedImage}
                alt="Selected Product"
                width={1200}
                height={800}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
