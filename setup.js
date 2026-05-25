import fs from 'fs';
import path from 'path';

// 1. Define the complete architecture directories
const dirs = [
  'src/assets/audio',
  'src/assets/images',
  'src/assets/icons',
  'src/components',
  'src/sections',
  'src/hooks',
  'src/styles',
  'src/utils',
  'src/data'
];

dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

// 2. Define all project files and their payloads
const files = {
  'package.json': `{
  "name": "the-universe-chose-hala",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "homepage": ".",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "canvas-confetti": "^1.9.3",
    "framer-motion": "^11.11.11",
    "gsap": "^3.12.5",
    "lenis": "^1.1.14",
    "lucide-react": "^0.454.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.169.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwind-merge": "^2.5.4",
    "tailwindcss": "^3.4.14",
    "gh-pages": "^6.2.0",
    "vite": "^5.4.10"
  }
}`,

  'vite.config.js': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});`,

  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#030303',
          midnight: '#070b19',
          purple: '#12072B',
          silver: '#E2E8F0',
          rose: '#FDA4AF',
          lavender: '#E9D5FF'
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      letterSpacing: {
        luxury: '0.25em',
        cinematic: '0.4em'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        }
      },
      boxShadow: {
        'luxury-glow': '0 0 40px rgba(253, 164, 175, 0.15)',
        'cosmic-glow': '0 0 50px rgba(233, 213, 255, 0.1)'
      }
    },
  },
  plugins: [],
}`,

  'postcss.config.js': `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,

  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Universe Chose Hala</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
    <style>
      body {
        background-color: #030303;
        margin: 0;
        overflow-x: hidden;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  '.gitignore': `node_modules
dist
dist-ssr
*.local
.vscode
.DS_Store`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

body {
  background-color: #030303;
  color: #E2E8F0;
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #030303;
}
::-webkit-scrollbar-thumb {
  background: rgba(253, 164, 175, 0.2);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(253, 164, 175, 0.5);
}

.glass-panel {
  background: rgba(7, 11, 25, 0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.text-glow-rose {
  text-shadow: 0 0 20px rgba(253, 164, 175, 0.6);
}

.text-glow-lavender {
  text-shadow: 0 0 20px rgba(233, 213, 255, 0.5);
}

html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overflow: clip;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}`,

  'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,

  'src/hooks/useNightMode.js': `import { useState, useEffect } from 'react';

export function useNightMode() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsNight(hour >= 19 || hour < 6);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return isNight;
}`,

  'src/components/CustomCursor.jsx': `import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.closest('.interactive-target')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-luxury-rose rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-luxury-rose/30"
        animate={{
          width: hovered ? 54 : 30,
          height: hovered ? 54 : 30,
          backgroundColor: hovered ? 'rgba(253, 164, 175, 0.05)' : 'rgba(253, 164, 175, 0)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}`,

  'src/components/AudioPlayer.jsx': `import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer({ introTriggered }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const nodesRef = useRef([]);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, ctx.currentTime);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, ctx.currentTime);
    filter.Q.setValueAtTime(2, ctx.currentTime);

    gainNode.gain.setValueAtTime(0.0, ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();

    nodesRef.current = { osc1, osc2, filter, gainNode, ctx };

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
    lfoGain.gain.setValueAtTime(80, ctx.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();
  };

  useEffect(() => {
    if (introTriggered && !isPlaying && audioCtxRef.current === null) {
      handleToggle();
    }
  }, [introTriggered]);

  const handleToggle = () => {
    initAudio();
    const { ctx, gainNode } = nodesRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    if (!isPlaying) {
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);
      setIsPlaying(true);
    } else {
      gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 1);
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-8 right-8 z-[999] glass-panel p-3 rounded-full text-luxury-rose hover:text-white transition-colors duration-300 shadow-luxury-glow interactive-target"
      aria-label="Toggle Soundscape"
    >
      {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
    </button>
  );
}`,

  'src/components/StarfieldBackground.jsx': `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function StarfieldBackground({ heartbeatActive }) {
  const containerRef = useRef();
  const starFieldRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const starCount = 4500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const roseColor = new THREE.Color('#FDA4AF');
    const purpleColor = new THREE.Color('#12072B');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < starCount * 3; i += 3) {
      const radius = Math.random() * 150 + 10;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      let selectedColor = whiteColor;
      const rand = Math.random();
      if (rand > 0.75) selectedColor = roseColor;
      else if (rand > 0.5) selectedColor = purpleColor;

      colors[i] = selectedColor.r;
      colors[i + 1] = selectedColor.g;
      colors[i + 2] = selectedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.45,
      map: texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starParticles = new THREE.Points(geometry, material);
    scene.add(starParticles);
    starFieldRef.current = starParticles;

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.015;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.015;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let reqId;

    const tick = () => {
      const elapsed = clock.getElapsedTime();
      
      starParticles.rotation.y = elapsed * 0.012;
      starParticles.rotation.x = elapsed * 0.006;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      if (heartbeatActive) {
        const pulseFactor = 1.0 + Math.sin(elapsed * 8) * 0.08;
        starParticles.scale.set(pulseFactor, pulseFactor, pulseFactor);
      } else {
        starParticles.scale.set(1, 1, 1);
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };
    
    tick();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [heartbeatActive]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none bg-transparent" />;
}`,

  'src/sections/IntroCinematic.jsx': `import React from 'react';
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
}`,

  'src/sections/WhyDifferent.jsx': `import React from 'react';
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
}`,

  'src/sections/MemoryWall.jsx': `import React, { useState } from 'react';
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
              layoutId={\`card-\${memory.id}\`}
              onClick={() => setSelected(memory)}
              className="interactive-target relative glass-panel p-4 rounded-xl cursor-pointer group shadow-luxury-glow"
              whileHover={{ scale: 1.02, rotate: memory.id % 2 === 0 ? 1 : -1 }}
            >
              <div className={\`w-full aspect-[4/5] bg-gradient-to-tr \${memory.gradient} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden border border-white/5\`}>
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
              layoutId={\`card-\${selected.id}\`}
              className="glass-panel max-w-xl w-full p-8 rounded-2xl relative overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 text-luxury-silver/60 hover:text-white transition-colors interactive-target"
              >
                <X size={20} />
              </button>

              <div className={\`w-full h-48 bg-gradient-to-tr \${selected.gradient} rounded-xl mb-6 flex items-center justify-center border border-white/10 shadow-inner\`}>
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
}`,

  'src/sections/HeartbeatExperience.jsx': `import React, { useState, useEffect, useRef } from 'react';
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
              {isPressing ? \`\${Math.round(progress)}%\` : "HOLD COR"}
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
}`,

  'src/sections/LoveMuseum.jsx': `import React, { useState } from 'react';
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
              className={\`interactive-target px-5 py-2.5 rounded-full text-xs font-sans tracking-luxury border transition-all duration-500 uppercase \${
                activeRoom === idx 
                  ? "bg-white text-luxury-black border-white shadow-luxury-glow" 
                  : "bg-transparent text-luxury-silver/50 border-white/10 hover:text-white hover:border-white/30"
              }\`}
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

          <div className={\`absolute inset-0 bg-gradient-to-tr \${museumRooms[activeRoom].bgGrad} opacity-30 transition-all duration-1000 pointer-events-none z-0\`} />
        </div>
      </div>
    </section>
  );
}`,

  'src/sections/FutureTimeline.jsx': `import React from 'react';
import { motion } from 'framer-motion';

const futureEras = [
  {
    year: "2028",
    milestone: "The Architecture of Our First Shared Space",
    detail: "High-ceilings, concrete structural surfaces, premium glass panels, and ambient lighting systems. A curated oasis where your laughter is the signature acoustic characteristic."
  },
  {
    year: "2035",
    milestone: "The Deep Trans-Continental Escape",
    detail: "Losing track of calendar metrics completely in forgotten foreign towns. Waking up alongside you to look over high balcony views overlooking historic coastlines."
  },
  {
    year: "2055",
    milestone: "Infinite Continuity Mechanics",
    detail: "Grey hair accents, identical premium taste parameters, and sitting in curated lounge furniture laughing at the exact same jokes we constructed forty years prior."
  }
];

export default function FutureTimeline() {
  return (
    <section className="min-h-screen py-32 px-4 relative flex flex-col justify-center items-center z-10">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-28">
          <span className="text-xs uppercase tracking-cinematic text-luxury-rose font-medium block mb-4">CHRONO-CONTINUUM</span>
          <h2 className="text-4xl md:text-5xl font-cinzel text-white tracking-wide">The Future Blueprint</h2>
          <div className="w-16 h-[1px] bg-luxury-rose/40 mx-auto mt-6" />
        </div>

        <div className="relative border-l border-white/10 pl-6 md:pl-12 ml-4 md:ml-8 space-y-16">
          {futureEras.map((era, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-luxury-black border-2 border-luxury-rose group-hover:bg-luxury-rose group-hover:scale-125 transition-all duration-300 shadow-luxury-glow" />

              <div className="glass-panel p-8 rounded-xl transition-all duration-500 hover:border-white/20">
                <span className="text-3xl font-cinzel font-bold text-glow-rose text-luxury-rose tracking-wider block mb-2">
                  {era.year}
                </span>
                <h3 className="text-xl font-serif text-white tracking-wide mb-3">
                  {era.milestone}
                </h3>
                <p className="text-luxury-silver/70 text-sm md:text-base font-sans font-light leading-relaxed">
                  {era.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'src/sections/HiddenSecrets.jsx': `import React, { useState } from 'react';
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
}`,

  'src/sections/FinalEnding.jsx': `import React from 'react';
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
}`,

  'src/App.jsx': `import React, { useState, useEffect } from 'react';
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
    <div className={\`relative min-h-screen selection:bg-luxury-rose/30 overflow-hidden \${
      isNight ? 'bg-[#020205]' : 'bg-luxury-black'
    }\`}>
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
}`,

  'README.md': `# THE UNIVERSE CHOSE HALA — DIGITAL ROMANCE INSTALLATION

An experiential, interactive, narrative application built entirely as a premium digital installation dedicated to Hala.

## 🚀 Execution Guide

1. Install modules: \`npm install\`
2. Boot development server: \`npm run dev\`
`
};

// 3. Write all physical files out to disk synchronously
Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content.trim());
  console.log('✔️ Created: ' + filePath);
});

console.log("\n✨ Every single project file has been generated natively on your computer! You can delete setup.js now.");
console.log("\n✨ Every single project file has been generated natively on your computer! You can delete setup.js now.");