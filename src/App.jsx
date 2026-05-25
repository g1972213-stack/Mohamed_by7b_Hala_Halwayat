import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';

import StarfieldBackground from './components/StarfieldBackground';
import CustomCursor from './components/CustomCursor';
import AudioPlayer from './components/AudioPlayer';

import IntroCinematic from './sections/IntroCinematic';
import WhyDifferent from './sections/WhyDifferent';
import MemoryWall from './sections/MemoryWall';
import HeartbeatExperience from './sections/HeartbeatExperience';
import LoveMuseum from './sections/LoveMuseum';
import FutureTimeline from './sections/FutureTimeline';
import HiddenSecrets from './sections/HiddenSecrets';
import FinalEnding from './sections/FinalEnding';

import { useNightMode } from './hooks/useNightMode';

export default function App() {
  const [introActive, setIntroActive] = useState(true);
  const [heartbeatActive, setHeartbeatActive] = useState(false);
  const isNight = useNightMode();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (introActive) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [introActive]);

  return (
    <div className={`relative min-h-screen selection:bg-luxury-rose/30 overflow-hidden ${
      isNight ? 'bg-[#020205]' : 'bg-luxury-black'
    }`}>
      <CustomCursor />
      <AudioPlayer introTriggered={!introActive} />
      <StarfieldBackground heartbeatActive={heartbeatActive} />

      <div className="fixed inset-0 z-1 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(253,164,175,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(233,213,255,0.05)_0%,transparent_70%)]" />
      </div>

      <AnimatePresence mode="wait">
        {introActive ? (
          <IntroCinematic key="intro" onStart={() => setIntroActive(false)} isVisible={introActive} />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative w-full z-10"
          >
            <WhyDifferent />
            <MemoryWall />
            <HeartbeatExperience setHeartbeatActive={setHeartbeatActive} />
            <LoveMuseum />
            <FutureTimeline />
            <HiddenSecrets />
            <FinalEnding />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}