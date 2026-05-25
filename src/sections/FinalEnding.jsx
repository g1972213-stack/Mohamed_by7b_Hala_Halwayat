import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function FinalEnding() {
  const triggerLuxuryCelebration = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#FDA4AF', '#E9D5FF', '#FFFFFF']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#FDA4AF', '#E9D5FF', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10 overflow-hidden bg-gradient-to-t from-[#12072B]/30 via-transparent to-transparent">
      <div className="max-w-3xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="glass-panel p-8 md:p-16 rounded-3xl border border-luxury-rose/20 relative shadow-luxury-glow backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(253,164,175,0.08)_0%,transparent_60%)] pointer-events-none" />

          <span className="text-4xl block mb-6 animate-bounce">✨</span>
          
          <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed mb-8 tracking-wide">
            “And if I had to live every single cosmic lifetime all over again… I would still find my way back to you.”
          </h2>

          <div className="w-12 h-[1px] bg-luxury-rose/30 mx-auto mb-8" />

          <p className="text-luxury-silver/70 text-sm font-sans font-light leading-relaxed max-w-xl mx-auto mb-12">
            Hala, you are my ultimate definition of beauty, my permanent coordinates in infinite space, and the greatest masterpiece the universe ever constructed.
          </p>

          <motion.button
            onClick={triggerLuxuryCelebration}
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(253, 164, 175, 0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="interactive-target border border-luxury-rose bg-gradient-to-r from-luxury-rose/20 to-luxury-purple/30 text-white font-cinzel tracking-cinematic text-xs md:text-sm px-12 py-5 rounded-full uppercase shadow-lg transition-all duration-500 font-bold"
          >
            Forever Starts Here
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}