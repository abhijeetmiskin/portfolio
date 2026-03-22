"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import MagneticElement from "./MagneticElement";

interface NavbarProps {
  scrollYProgress: MotionValue<number>;
}

export default function Navbar({ scrollYProgress }: NavbarProps) {
  // Add a subtle glass backdrop when scrolling down past 5%
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 0.8]);

  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (audioEnabled) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      
      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.03; // Very subtle low drone
      gainNode.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 55; // Sub bass
      osc1.connect(gainNode);
      osc1.start();
      osc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = "sawtooth";
      osc2.frequency.value = 55.4; // Detune for mechanical hum
      osc2.connect(gainNode);
      osc2.start();
      osc2Ref.current = osc2;
    } else {
      if (osc1Ref.current) osc1Ref.current.stop();
      if (osc2Ref.current) osc2Ref.current.stop();
    }

    return () => {
      if (osc1Ref.current) { try { osc1Ref.current.stop(); } catch(e){} }
      if (osc2Ref.current) { try { osc2Ref.current.stop(); } catch(e){} }
    };
  }, [audioEnabled]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 pointer-events-auto"
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(11, 11, 11, ${v})`),
        backdropFilter: useTransform(bgOpacity, (v) => v > 0 ? "blur(8px)" : "none"),
      }}
    >
      <MagneticElement strength={20}>
        <div className="font-headings text-xl font-bold tracking-widest text-[#ededed] cursor-pointer">
          AM<span className="text-[#B71C1C]">.</span>
        </div>
      </MagneticElement>

      <div className="flex gap-4 items-center">
        <MagneticElement strength={10}>
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="hidden sm:inline-block text-xs font-headings tracking-widest px-4 py-2 border border-[#2a2a2a] hover:border-[#B71C1C] hover:text-[#B71C1C] transition-colors rounded-none bg-[#0b0b0b] bg-opacity-50"
          >
            AUDIO: {audioEnabled ? "ON" : "OFF"}
          </button>
        </MagneticElement>

        <MagneticElement strength={15}>
          <a 
            href="tel:7338473004" 
            className="hidden sm:inline-block text-sm font-headings tracking-widest px-6 py-2 border border-[#2a2a2a] hover:border-[#B71C1C] hover:text-[#B71C1C] transition-colors rounded-none bg-[#0b0b0b] bg-opacity-50"
          >
            7338473004
          </a>
        </MagneticElement>

        <MagneticElement strength={20}>
          <a 
            href="https://linkedin.com/in/abhijeet-miskin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-headings tracking-widest px-6 py-2 border border-[#2a2a2a] hover:border-[#B71C1C] hover:text-[#B71C1C] transition-colors rounded-none bg-[#0b0b0b] bg-opacity-50 inline-block"
          >
            LINKEDIN
          </a>
        </MagneticElement>
      </div>
    </motion.header>
  );
}
