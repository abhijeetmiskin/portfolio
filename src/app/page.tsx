"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { sequenceData } from "@/data/transformerData";
import Navbar from "@/components/Navbar";
import TransformerScrollCanvas from "@/components/TransformerScrollCanvas";
import TransformerExperience from "@/components/TransformerExperience";
import TiltCard from "@/components/TiltCard";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Master scroll architecture (critical)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#0b0b0b] min-h-screen">
      <Navbar scrollYProgress={scrollYProgress} />

      {/* Scroll sequence locked for 500vh */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <TransformerScrollCanvas 
            scrollYProgress={scrollYProgress} 
            totalFrames={sequenceData.totalFrames}
            imageFolderPath={sequenceData.imageFolderPath}
          />
          <TransformerExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* Post-sequence content */}
      <div className="relative z-20 bg-[#0b0b0b] px-8 py-32 border-t border-[#2a2a2a] -mt-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Specs Grid */}
            <div>
              <h3 className="font-headings text-2xl font-bold uppercase tracking-widest text-[#ededed] mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#B71C1C]"></span>
                Technical Profile
              </h3>
              <ul className="space-y-4 font-body text-[#ededed] opacity-80 tracking-widest text-sm sm:text-base">
                <li className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span>EDUCATION</span>
                  <span className="text-[#B71C1C] font-headings text-right">B.E. @ KLE TECH (2027)</span>
                </li>
                <li className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span>CORE FOCUS</span>
                  <span className="text-[#B71C1C] font-headings text-right">MACHINE LEARNING</span>
                </li>
                <li className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span>ACHIEVEMENT</span>
                  <span className="text-[#B71C1C] font-headings text-right">TOP 50 HACK KARNATAKA</span>
                </li>
                <li className="flex justify-between border-b border-[#2a2a2a] pb-2">
                  <span>TECH STACK</span>
                  <span className="text-[#B71C1C] font-headings text-right">PYTHON / C++ / AI</span>
                </li>
              </ul>
            </div>

            {/* Features Case Study */}
            <div>
              <h3 className="font-headings text-2xl font-bold uppercase tracking-widest text-[#ededed] mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#B71C1C]"></span>
                Research & Development
              </h3>
              <p className="font-body text-[#ededed] opacity-70 leading-relaxed mb-6">
                As an Undergraduate Researcher, I focus on applying Deep Learning to solve complex real-world problems. My recent work includes co-authoring an IEEE conference paper on self-supervised MRI/X-Ray denoising models, evaluating critical outputs using PSNR and SSIM metrics.
              </p>
              <p className="font-body text-[#ededed] opacity-70 leading-relaxed">
                Beyond academic research, I architected an AI-based flood prediction system (99.7% accuracy) utilizing DEM spatial features and Random Forest classifiers. This platform runs efficiently on FastAPI with interactive live alerts powered by OpenWeather AI APIs.
              </p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="mt-24">
            <h3 className="font-headings text-2xl font-bold uppercase tracking-widest text-[#ededed] mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#B71C1C]"></span>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Project 1 */}
              <TiltCard>
                <div className="border border-[#2a2a2a] p-8 hover:border-[#B71C1C] transition-colors bg-[#111111]/30 h-full flex flex-col pointer-events-auto">
                  <div className="text-[#B71C1C] font-headings text-sm mb-2 tracking-[0.2em]">2025</div>
                  <h4 className="font-headings text-xl font-bold text-[#ededed] mb-4 uppercase tracking-wider">Self-Supervised Denoising for Low-Dose MRI</h4>
                  <p className="font-body text-[#ededed] opacity-70 mb-6 text-sm sm:text-base leading-relaxed">
                    Developed a self-supervised deep learning model using Python and OpenCV for denoising low-dose medical images. Curated and preprocessed MRI/X-ray datasets for training, evaluating performance via PSNR and SSIM. This research directly contributed to an accepted IEEE conference paper.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">DEEP LEARNING</span>
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">PYTHON</span>
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">OPENCV</span>
                  </div>
                </div>
              </TiltCard>

              {/* Project 2 */}
              <TiltCard>
                <div className="border border-[#2a2a2a] p-8 hover:border-[#B71C1C] transition-colors bg-[#111111]/30 h-full flex flex-col pointer-events-auto">
                  <div className="text-[#B71C1C] font-headings text-sm mb-2 tracking-[0.2em]">2025</div>
                  <h4 className="font-headings text-xl font-bold text-[#ededed] mb-4 uppercase tracking-wider">Real-Time Weather & Flood Alert Platform</h4>
                  <p className="font-body text-[#ededed] opacity-70 mb-6 text-sm sm:text-base leading-relaxed">
                    Engineered a full-stack platform integrating live weather API intelligence with a Random Forest flood risk prediction model (99.7% accuracy). Deployed robust REST APIs using FastAPI for real-time probability analysis based on large-scale geospatial Rasterio DEM processing.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">FASTAPI</span>
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">SCIKIT-LEARN</span>
                    <span className="text-xs font-headings px-3 py-1 border border-[#2a2a2a] text-[#ededed] bg-[#0b0b0b]">RASTERIO</span>
                  </div>
                </div>
              </TiltCard>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 bg-[#0b0b0b] px-8 py-16 border-t border-[#2a2a2a] flex flex-col md:flex-row justify-between items-center font-headings text-xs tracking-[0.2em] text-[#ededed] opacity-50 space-y-4 md:space-y-0">
        <div>© {new Date().getFullYear()} ABHIJEET MISKIN. ALL RIGHTS RESERVED.</div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <a href="tel:7338473004" className="hover:text-[#B71C1C] transition-colors">CALL: 7338473004</a>
          <span>AI & ELECTRONICS ENGINEERING</span>
        </div>
      </footer>
    </main>
  );
}
