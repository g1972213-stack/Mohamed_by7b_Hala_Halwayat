import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar } from 'lucide-react';

const historicalMemories = [
  {
    id: 1,
    gradient: "from-purple-900 via-indigo-950 to-black",
    title: "The Midnight Coffee Run",
    date: "October 14",
    caption: "The stars fell secondary to the conversation we held. We talked until the neon signs dimmed out.",
    extendedText: "That night, under an atmospheric sky, I realized your perspective was completely unmatched. Every concept you touched upon sparkled with clarity."
  },
  {
    id: 2,
    gradient: "from-rose-950 via-slate-900 to-luxury-black",
    title: "The Ocean Blueprint Horizon",
    date: "December 22",
    caption: "Cold winter air, warm intertwined hands, and a vast endless blue reflecting the depth of your eyes.",
    extendedText: "The horizon felt infinite, but my entire landscape collapsed down perfectly to just you standing right beside me."
  },
  {
    id: 3,
    gradient: "from-blue-950 via-fuchsia-950 to-neutral-950",
    title: "The Unexpected Rain Convergence",
    date: "April 05",
    caption: "Completely soaked through, shelter under a glass awning, laughing uncontrollably at absolutely nothing.",
    extendedText: "It was in that absolute vulnerability that the architecture of our future felt fully locked into historical permanence."
  }
];

export default function MemoryWall() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10 bg-gradient-to-b from-transparent via-luxury-black to-transparent">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">CHRONICLES OF SPACE</span>
          <h2 className="text-4xl md:text-5xl font-cinzel text-white tracking-wide">The Memory Wall</h2>
          <div className="w-16 h-[1px] bg-luxury-rose/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {historicalMemories.map((memory) => (
            <motion.div
              key={memory.id}
              layoutId={`card-${memory.id}`}
              onClick={() => setSelected(memory)}
              className="interactive-target relative glass-panel p-4 rounded-xl cursor-pointer group shadow-luxury-glow"
              whileHover={{ scale: 1.02, rotate: memory.id % 2 === 0 ? 1 : -1 }}
            >
              <div className={`w-full aspect-[4/5] bg-gradient-to-tr ${memory.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden border border-white/5`}>
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <span className="text-4xl">✨</span>
              </div>
              <div className="px-2">
                <div className="flex items-center space-x-2 text-xs text-luxury-rose mb-2 font-sans">
                  <Calendar size={12} />
                  <span>{memory.date}</span>
                </div>
                <h3 className="text-lg font-serif text-white tracking-wide mb-1">{memory.title}</h3>
                <p className="text-xs text-luxury-silver/60 font-sans font-light line-clamp-2">{memory.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 bg-luxury-black/90 backdrop-blur-xl z-[99999] flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${selected.id}`}
              className="glass-panel max-w-xl w-full p-8 rounded-2xl relative overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-luxury-silver/60 hover:text-white transition-colors interactive-target"
              >
                <X size={20} />
              </button>

              <div className={`w-full h-48 bg-gradient-to-tr ${selected.gradient} rounded-xl mb-6 flex items-center justify-center border border-white/10 shadow-inner`}>
                <span className="text-5xl">🌌</span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-luxury-rose mb-3">
                <Calendar size={14} />
                <span className="font-medium tracking-wider">{selected.date}</span>
              </div>

              <h3 className="text-2xl font-cinzel text-white mb-4 tracking-wide">{selected.title}</h3>
              <p className="text-luxury-silver text-sm font-sans font-light leading-relaxed mb-4 italic">
                "{selected.caption}"
              </p>
              <p className="text-luxury-silver/70 text-sm font-sans font-light leading-relaxed">
                {selected.extendedText}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}