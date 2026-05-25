import React, { useState, useEffect, useRef } from 'react';
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
}