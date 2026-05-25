import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const customEasterEggs = [
  { id: 1, top: "15%", left: "20%", msg: "Secret Log #01: I fell completely in love with you far before I verbalized it." },
  { id: 2, top: "45%", left: "75%", msg: "Secret Log #02: You hold a completely flawless record inside my mind." },
  { id: 3, top: "70%", left: "30%", msg: "Secret Log #03: The literal universe didn't just choose you, it aligned entirely for you." },
  { id: 4, top: "25%", left: "80%", msg: "Secret Log #04: Your pure presence is the antidote to my existential noise." }
];

export default function HiddenSecrets() {
  const [activeEgg, setActiveEgg] = useState(null);

  return (
    <section className="h-[60vh] relative z-10 w-full flex flex-col justify-center items-center overflow-hidden bg-transparent">
      <div className="text-center max-w-md px-4 select-none pointer-events-none">
        <span className="text-[10px] uppercase tracking-cinematic text-luxury-silver/40 font-medium block mb-2">CELESTIAL EASTER EGGS</span>
        <p className="text-xs font-sans text-luxury-silver/50 font-light italic">
          There are hidden nodes floating in the immediate dark void space around you. Scan and touch them to extract secret codex notes.
        </p>
      </div>

      {customEasterEggs.map((egg) => (
        <motion.button
          key={egg.id}
          onClick={() => setActiveEgg(egg.id === activeEgg ? null : egg.id)}
          className="absolute w-3 h-3 bg-white/40 hover:bg-luxury-rose rounded-full cursor-pointer interactive-target flex items-center justify-center shadow-cosmic-glow"
          style={{ top: egg.top, left: egg.left }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + egg.id,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-12 glass-panel px-6 py-4 rounded-xl text-center max-w-sm border border-luxury-rose/30 shadow-luxury-glow mx-4"
          >
            <p className="text-xs md:text-sm font-serif italic text-luxury-rose">
              {customEasterEggs.find(e => e.id === activeEgg)?.msg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}