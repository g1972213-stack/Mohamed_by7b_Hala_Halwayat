import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const museumRooms = [
  {
    id: "first-sight",
    title: "The First Time I Saw You",
    subtitle: "Absolute Visual Singularity",
    desc: "Time lost its uniform progression entirely. In a crowded room of moving noise, your silhouette stood out like a beautifully designed piece of classic literature.",
    bgGrad: "from-[#0a0518] to-luxury-black"
  },
  {
    id: "subtle-details",
    title: "Things You Don’t Notice",
    subtitle: "Subterranean Magic Structures",
    desc: "The hyper-specific curve of your eyelids when you become intensely focused, and how you adjust your hair completely sub-consciously whenever you prepare to speak a beautiful absolute truth.",
    bgGrad: "from-[#040e1a] to-luxury-black"
  },
  {
    id: "unforgettable",
    title: "Moments Imprinted Forever",
    subtitle: "Permanent Universal Matter",
    desc: "The architecture of shared tears, laughing sessions that absolute structural exhaustion could not end, and the deep safety of resting against your chest while the entire world passed by outside.",
    bgGrad: "from-[#140510] to-luxury-black"
  },
  {
    id: "destiny-future",
    title: "The Vision of Our Future",
    subtitle: "Uncharted Sovereign Reality",
    desc: "Building a home that features walls covered entirely in art, continuous design travels to forgotten cities, and knowing with complete absolute certainty that aging next to you is the grand objective.",
    bgGrad: "from-[#051412] to-luxury-black"
  }
];

export default function LoveMuseum() {
  const [activeRoom, setActiveRoom] = useState(0);

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10 overflow-hidden">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">CURATED EXHIBITION</span>
          <h2 className="text-4xl md:text-5xl font-cinzel text-white tracking-wide">Digital Love Museum</h2>
          <div className="w-16 h-[1px] bg-luxury-rose/40 mx-auto mt-6" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {museumRooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(idx)}
              className={`interactive-target px-5 py-2.5 rounded-full text-xs font-sans tracking-luxury border transition-all duration-500 uppercase ${
                activeRoom === idx 
                  ? "bg-white text-luxury-black border-white shadow-luxury-glow" 
                  : "bg-transparent text-luxury-silver/50 border-white/10 hover:text-white hover:border-white/30"
              }`}
            >
              0{idx + 1}. {room.id.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="w-full relative min-h-[400px] rounded-2xl glass-panel p-8 md:p-12 flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoom}
              initial={{ opacity: 0, x: 25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -25, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10"
            >
              <span className="text-xs font-mono text-luxury-rose tracking-widest uppercase block mb-2">
                {museumRooms[activeRoom].subtitle}
              </span>
              <h3 className="text-3xl md:text-4xl font-serif text-white tracking-wide mb-6">
                {museumRooms[activeRoom].title}
              </h3>
              <p className="text-luxury-silver/80 text-base md:text-lg font-sans font-light leading-relaxed max-w-3xl">
                {museumRooms[activeRoom].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className={`absolute inset-0 bg-gradient-to-tr ${museumRooms[activeRoom].bgGrad} opacity-30 transition-all duration-1000 pointer-events-none z-0`} />
        </div>
      </div>
    </section>
  );
}