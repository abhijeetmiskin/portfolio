"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringObj, setIsHoveringObj] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the rapid mousemove updates
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track when hovering over clickable elements to grow the cursor
    const handleLinkHoverIn = () => setIsHoveringObj(true);
    const handleLinkHoverOut = () => setIsHoveringObj(false);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const interactiveElements = document.querySelectorAll("a, button, .magnetic, .interactive");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHoverIn);
      el.addEventListener("mouseleave", handleLinkHoverOut);
    });

    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverIn);
        el.removeEventListener("mouseleave", handleLinkHoverOut);
      });
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#B71C1C] pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: isHoveringObj ? 1.5 : 1,
        backgroundColor: isHoveringObj ? "rgba(183, 28, 28, 0.2)" : "transparent",
      }}
      transition={{ scale: { duration: 0.2, ease: "easeOut" } }}
    />
  );
}
