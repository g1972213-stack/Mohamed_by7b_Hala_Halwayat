import React from 'react';
import { motion } from 'framer-motion';

export default function IntroCinematic({ onStart, isVisible }) {
  if (!isVisible) return null;

  const letterVariants = {
    hidden: { opacity: 0, scale: 3, filter: 'blur(15px)' },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { delay: i * 0.22, duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-luxury-black z-[9999] flex flex-col justify-center items-center px-4 overflow-hidden"
      exit={{ opacity: 0, filter: 'blur(20px)', transition: { duration: 1.8, ease: 'easeInOut' } }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,7,43,0.4)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center max-w-4xl z-10 select-none">
        <div className="flex justify-center space-x-6 md:space-x-12 mb-8">
          {["H", "A", "L", "A"].map((char, index) => (
            <motion.h1
              key={index}
              custom={index}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-7xl md:text-9xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-luxury-silver to-luxury-rose/80 tracking-widest text-glow-rose"
            >
              {char}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1.4, ease: 'easeOut' }}
          className="text-luxury-silver/70 tracking-luxury text-sm md:text-lg max-w-xl mx-auto font-sans font-light leading-relaxed mb-12"
        >
          Out of billions of people… somehow life led me to you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(253, 164, 175, 0.4)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          onClick={onStart}
          className="interactive-target border border-luxury-rose/40 bg-luxury-black/60 backdrop-blur-md px-10 py-4 rounded-full text-luxury-rose uppercase tracking-cinematic text-xs font-medium hover:bg-luxury-rose hover:text-luxury-black transition-all duration-500"
        >
          Enter Your Universe
        </motion.button>
      </div>
    </motion.div>
  );
}