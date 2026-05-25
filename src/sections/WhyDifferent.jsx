import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Compass, Moon } from 'lucide-react';

const coreReasons = [
  {
    icon: <Sparkles className="w-6 h-6 text-luxury-rose" />,
    title: "Your Radiant Mind",
    desc: "The effortless elegance of how your thoughts move. You don't just perceive the world, you illuminate its hidden corners with pure clarity."
  },
  {
    icon: <Heart className="w-6 h-6 text-luxury-lavender" />,
    title: "Unconditional Empathy",
    desc: "Your heart carries a structural weight of kindness that shifts the very room you step into. You feel deeply, and heal entirely."
  },
  {
    icon: <Compass className="w-6 h-6 text-luxury-rose" />,
    title: "The Architecture of Your Laugh",
    desc: "An acoustic masterpiece that anchors me. It makes the grand chaos of space and passing cosmic systems fall perfectly silent."
  },
  {
    icon: <Moon className="w-6 h-6 text-luxury-lavender" />,
    title: "Your Paradoxical Magic",
    desc: "Both a calm serene sanctuary and an uncontainable cosmic force. In a universe built entirely on chaos, you are my perfect alignment."
  }
];

export default function WhyDifferent() {
  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24"
        >
          <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">THE SINGULARITY</span>
          <h2 className="text-4xl md:text-5xl font-cinzel text-white tracking-wide">Why You Are Different</h2>
          <div className="w-16 h-[1px] bg-luxury-rose/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {coreReasons.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden shadow-cosmic-glow group cursor-default"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-luxury-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="mb-6 p-3 bg-white/5 rounded-xl inline-block border border-white/10 shadow-inner group-hover:border-luxury-rose/30 transition-colors duration-500">
                {card.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-4 tracking-wide group-hover:text-luxury-rose transition-colors duration-300">{card.title}</h3>
              <p className="text-luxury-silver/70 font-sans font-light leading-relaxed text-sm md:text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}