import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hiddenMessages = [
  "You make the entire world quiet.",
  "Every layer of my heart belongs to you.",
  "You are my absolute home in this infinity.",
  "My universe constructs itself around your peace."
];

export default function HeartbeatExperience({ setHeartbeatActive }) {
  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);

  const startPulseAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(42, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;

      let toggle = true;
      intervalRef.current = setInterval(() => {
        if (!gainRef.current || !audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        gainRef.current.gain.setValueAtTime(toggle ? 0.8 : 0.4, now);
        gainRef.current.gain.exponentialRampToValueAtTime(0.01, now + (toggle ? 0.15 : 0.25));
        toggle = !toggle;
      }, 450);

    } catch (e) {
      console.warn("Audio node context fail safe initialization triggered");
    }
  };

  const stopPulseAudio = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (gainRef.current && audioCtxRef.current) {
      try {
        gainRef.current.gain.setValueAtTime(gainRef.current.gain.value, audioCtxRef.current.currentTime);
        gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.1);
      } catch(err){}
    }
  };

  useEffect(() => {
    let animationFrame;
    if (isPressing) {
      setHeartbeatActive(true);
      startPulseAudio();
      const startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const currentProg = Math.min((elapsed / 3500) * 100, 100);
        setProgress(currentProg);

        if (currentProg < 100) {
          animationFrame = requestAnimationFrame(updateProgress);
        } else {
          const randomMsg = hiddenMessages[Math.floor(Math.random() * hiddenMessages.length)];
          setCurrentMessage(randomMsg);
        }
      };
      animationFrame = requestAnimationFrame(updateProgress);
    } else {
      setHeartbeatActive(false);
      stopPulseAudio();
      setProgress(0);
      setCurrentMessage("");
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPressing, setHeartbeatActive]);

  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10 select-none">
      <div className="max-w-xl text-center">
        <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">QUANTUM ALIGNMENT</span>
        <h2 className="text-4xl font-cinzel text-white tracking-wide mb-6">The Heartbeat Sync</h2>
        <p className="text-luxury-silver/60 text-sm font-sans font-light leading-relaxed mb-12">
          Press and perfectly hold the dimensional pulse engine below. Align your sensory framework with the baseline rhythm of my devotion.
        </p>

        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          <AnimatePresence>
            {isPressing && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border border-luxury-rose/30 pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut', delay: 0.4 }}
                  className="absolute inset-0 rounded-full border border-luxury-lavender/20 pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>

          <motion.div
            onMouseDown={() => setIsPressing(true)}
            onMouseUp={() => setIsPressing(false)}
            onMouseLeave={() => setIsPressing(false)}
            onTouchStart={() => setIsPressing(true)}
            onTouchEnd={() => setIsPressing(false)}
            animate={{
              scale: isPressing ? [0.96, 1.04, 0.96] : 1,
              boxShadow: isPressing ? '0 0 50px rgba(253, 164, 175, 0.4)' : '0 0 20px rgba(253, 164, 175, 0.1)'
            }}
            transition={{
              scale: isPressing ? { repeat: Infinity, duration: 0.9, ease: 'easeInOut' } : { duration: 0.3 }
            }}
            className="w-36 h-36 rounded-full glass-panel border border-luxury-rose/40 flex flex-col items-center justify-center cursor-pointer interactive-target z-20"
          >
            <span className="text-3xl mb-1">{isPressing ? "❤️" : "🤍"}</span>
            <span className="text-[10px] tracking-widest text-luxury-rose font-medium uppercase">
              {isPressing ? `${Math.round(progress)}%` : "HOLD COR"}
            </span>
          </motion.div>

          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle cx="96" cy="96" r="84" className="stroke-white/5 fill-none" strokeWidth="2" />
            <motion.circle
              cx="96"
              cy="96"
              r="84"
              className="stroke-luxury-rose fill-none"
              strokeWidth="2"
              strokeDasharray="528"
              animate={{ strokeDashoffset: 528 - (528 * progress) / 100 }}
              transition={{ ease: 'linear' }}
            />
          </svg>
        </div>

        <div className="h-24 mt-12 flex items-center justify-center">
          <AnimatePresence>
            {currentMessage && (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xl font-serif text-glow-rose text-luxury-rose italic"
              >
                {currentMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}