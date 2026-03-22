"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";

interface TransformerScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function TransformerScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: TransformerScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames).fill(null));
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  // Map 0-1 to 1-totalFrames
  const currentFrame = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);

  // Preload images on mount
  useEffect(() => {
    let loaded = 0;
    
    // Load the realistic fallback cinematic background first
    const baseImg = new Image();
    baseImg.src = "/images/transformer_base.png";
    baseImg.onload = () => {
      baseImageRef.current = baseImg;
      if (loadedCount === 0) renderFrame(1);
    };

    // Attempt to load genuine sequence if available
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `${imageFolderPath}/${i}.jpg`;
      img.onload = () => {
        imagesRef.current[i - 1] = img;
        loaded++;
        setLoadedCount(loaded);
        if (i === 1) renderFrame(1); // render first frame instantly
      };
      img.onerror = () => {
        // Fallback to base rendering
        loaded++;
        setLoadedCount(loaded);
      };
    }
  }, [totalFrames, imageFolderPath]);

  // Setup Resize Observer for crisp high-dpi re-rendering
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      renderFrame(Math.round(currentFrame.get()));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Init

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderFrame = (frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.fillStyle = "#0b0b0b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const index = Math.max(1, Math.min(frame, totalFrames)) - 1;
    const img = imagesRef.current[index];
    const baseImg = baseImageRef.current;

    // Use specific sequence frame if it exists, otherwise fallback to cinematic zoom on base image
    const activeImage = (img && img.complete && img.naturalHeight > 0) ? img : (baseImg && baseImg.complete ? baseImg : null);

    if (activeImage) {
      // Logic for Object-Fit: Cover with cinematic pan/zoom
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      const hRatio = canvas.width / activeImage.width;
      const vRatio = canvas.height / activeImage.height;
      const baseRatio = Math.max(hRatio, vRatio); // Use Cover for cinematic feel to fill screen

      // If we are using the fallback base image, we simulate the sequence through cinematic scale and pan
      let scaleMultiplier = 1;
      let panY = 0;

      if (activeImage === baseImg) {
        const progress = index / totalFrames; // 0.0 to 1.0
        scaleMultiplier = 1 + (progress * 0.4); // Zoom in 40% dynamically over the scroll
        panY = progress * (activeImage.height * 0.15); // Pan down slightly
      }
      
      const finalRatio = baseRatio * scaleMultiplier;
      const renderWidth = activeImage.width * finalRatio;
      const renderHeight = activeImage.height * finalRatio;

      const centerShift_x = (canvas.width - renderWidth) / 2;
      const centerShift_y = (canvas.height - renderHeight) / 2 - (panY * finalRatio);
      
      ctx.drawImage(
        activeImage,
        0, 0, activeImage.width, activeImage.height,
        centerShift_x, centerShift_y, renderWidth, renderHeight
      );
      
      // Add a dynamic vignette over it to make HUD texts highly legible
      const progress = index / totalFrames;
      ctx.fillStyle = `rgba(11, 11, 11, ${0.4 + progress * 0.4})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useMotionValueEvent(currentFrame, "change", (latest) => {
    renderFrame(Math.round(latest));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      aria-hidden="true"
    />
  );
}
