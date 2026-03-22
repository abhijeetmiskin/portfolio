"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { sequenceData } from "../data/transformerData";
import GlitchText from "./GlitchText";

interface TransformerExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function TransformerExperience({ scrollYProgress }: TransformerExperienceProps) {
  const { phases } = sequenceData;

  // HERO PHASE (0% - 30%)
  const heroOpacity = useTransform(scrollYProgress, [0, phases.hero.range[1] - 0.05, phases.hero.range[1]], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, phases.hero.range[1]], [0, -40]);

  // TRANSFORMATION PHASE (30% - 75%)
  const transOpacity = useTransform(
    scrollYProgress, 
    [phases.transformation.range[0] - 0.05, phases.transformation.range[0], phases.transformation.range[1] - 0.05, phases.transformation.range[1]], 
    [0, 1, 1, 0]
  );
  // Animate the diagnostics vertically slightly
  const transY = useTransform(scrollYProgress, phases.transformation.range, [20, -20]);

  // Current frame string derived from total frames based on scrolling (0..204)
  const exactFrame = useTransform(scrollYProgress, [0, 1], [1, sequenceData.totalFrames]);
  const frameStr = useTransform(exactFrame, Math.round, (v) => v.toString().padStart(3, '0'));

  // ARRIVAL PHASE (75% - 100%)
  const arrivalOpacity = useTransform(
    scrollYProgress, 
    [phases.arrival.range[0] - 0.05, phases.arrival.range[0], 1], 
    [0, 1, 1]
  );
  const arrivalY = useTransform(scrollYProgress, phases.arrival.range, [40, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden text-[#ededed]">
      
      {/* HUD Edge Rails (constant but pulsing slightly or changing color) */}
      <div className="absolute left-8 bottom-8 font-headings text-xs tracking-widest text-[#2a2a2a] rotate-180" style={{ writingMode: 'vertical-rl' }}>
        SYS_STATUS: OPTIMAL
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-headings text-xs tracking-widest text-[#2a2a2a]" style={{ writingMode: 'vertical-rl' }}>
        FRAME_RND_ENGINE
      </div>

      {/* Hero Presence */}
      <motion.div 
        className="absolute bottom-16 left-8 sm:left-16 max-w-md pointer-events-auto"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <h1 className="font-headings text-4xl sm:text-6xl font-bold uppercase leading-none tracking-tighter mb-2">
          {phases.hero.title.split(' ').map((word, i) => (
            <GlitchText className="block mb-2" key={i}>{word}</GlitchText>
          ))}
        </h1>
        <p className="font-body text-sm sm:text-base text-[#B71C1C] tracking-[0.2em] uppercase">
          {phases.hero.subtitle}
        </p>
      </motion.div>

      {/* Transformation Peak (Diagnostics) */}
      <motion.div 
        className="absolute top-1/3 right-8 sm:right-16 text-right"
        style={{ opacity: transOpacity, y: transY }}
      >
        <div className="font-headings text-sm sm:text-base text-[#B71C1C] tracking-widest mb-4">
          <motion.span>FRAME </motion.span>
          <motion.span>{frameStr}</motion.span>
          <span> / {sequenceData.totalFrames}</span>
        </div>
        <ul className="space-y-1">
          {phases.transformation.diagnostics.map((diag, i) => (
            <li key={i} className="font-body text-xs sm:text-sm text-[#ededed] opacity-80 tracking-widest uppercase">
              {diag}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Arrival Robot */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/40 backdrop-blur-sm"
        style={{ opacity: arrivalOpacity }}
      >
        <motion.div style={{ y: arrivalY }}>
          <h2 className="font-headings text-3xl sm:text-5xl font-bold uppercase tracking-widest mb-4">
            {phases.arrival.statement}
          </h2>
          <p className="font-body text-sm sm:text-lg text-[#B71C1C] tracking-[0.3em] mb-8">
            {phases.arrival.signature}
          </p>
          <button className="pointer-events-auto border border-[#ededed] px-8 py-3 font-headings text-sm tracking-widest hover:bg-[#ededed] hover:text-[#0b0b0b] transition-all duration-300">
            {phases.arrival.cta}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
