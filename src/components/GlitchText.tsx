"use client";

import { ReactNode } from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <div className={`glitch-wrapper block relative interactive ${className}`} data-text={children}>
      <span className="relative z-10">{children}</span>
    </div>
  );
}
