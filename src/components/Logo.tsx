import React from "react";

interface LogoProps {
  className?: string;
  light?: boolean;
}

interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  split?: "tl-br" | "tr-bl";
  color2?: string;
  opacity?: number;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const brandBlue = light ? "text-white" : "text-[#0B2F61]";
  const sloganGray = light ? "text-blue-200/80" : "text-[#556F8D]";

  // Palette adjusted to match the company logo colors perfectly
  const c1 = light ? "#FFFFFF" : "#0B2F61"; // Primary Deep Navy
  const c2 = light ? "#93C5FD" : "#134074"; // Dark Blue / Medium Navy
  const c3 = light ? "#60A5FA" : "#1E5C99"; // Tech Blue
  const c4 = light ? "#3B82F6" : "#2E75B6"; // Muted Blue
  const c5 = light ? "#2563EB" : "#3F87D3"; // Bright Blue
  const c6 = light ? "#60A5FA" : "#4A94E8"; // Bright Accent Cyan
  const c7 = light ? "#93C5FD" : "#6AA9F1"; // Soft blue
  const c8 = light ? "#BFDBFE" : "#98C4F9"; // Very light blue

  // Facets for the right loop to render a gorgeous 3D faceted polygonal ribbon
  const rightFacets = [
    // Top half going right
    { points: "50,22.5 58,13.5 57,19.5", color: c2 },
    { points: "58,13.5 57,19.5 64,17.5", color: c1 },
    { points: "58,13.5 67,9 64,17.5", color: c3 },
    { points: "67,9 64,17.5 71,17.5", color: c2 },
    { points: "67,9 77,9 71,17.5", color: c4 },
    { points: "77,9 71,17.5 78,19.5", color: c3 },
    { points: "77,9 87,14.5 78,19.5", color: c5 },
    { points: "87,14.5 78,19.5 81.5,22.5", color: c3 },
    { points: "87,14.5 91,22.5 81.5,22.5", color: c5 },

    // Bottom half going left
    { points: "91,22.5 87,30.5 81.5,22.5", color: c2 },
    { points: "87,30.5 81.5,22.5 78,25.5", color: c1 },
    { points: "87,30.5 77,36 78,25.5", color: c3 },
    { points: "77,36 78,25.5 71,27.5", color: c2 },
    { points: "77,36 67,36 71,27.5", color: c4 },
    { points: "67,36 71,27.5 64,27.5", color: c3 },
    { points: "67,36 58,31.5 64,27.5", color: c5 },
    { points: "58,31.5 64,27.5 57,25.5", color: c3 },
    { points: "58,31.5 50,22.5 57,25.5", color: c1 },

    // Core central overlap enhancements
    { points: "57,19.5 64,17.5 64,27.5", color: c2, opacity: 0.85 },
    { points: "64,17.5 71,17.5 71,27.5", color: c3, opacity: 0.85 },
    { points: "71,17.5 78,19.5 78,25.5", color: c4, opacity: 0.85 },
    { points: "78,19.5 81.5,22.5 78,25.5", color: c5, opacity: 0.85 }
  ];

  // Procedural blocks for the left loop of the infinity symbol (high-fidelity pixel mesh)
  const leftBlocks: Block[] = [
    // Transition crossing nodes
    { x: 42.5, y: 17.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c1 },
    { x: 42.5, y: 24.5, w: 3.5, h: 3.5, color: c2, split: "tl-br", color2: c1 },

    // Column x = 38.5
    { x: 38.5, y: 14.5, w: 3.5, h: 3.5, color: c1, split: "tl-br", color2: c2 },
    { x: 38.5, y: 18.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c3 },
    { x: 38.5, y: 23.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c1 },
    { x: 38.5, y: 27.5, w: 3.5, h: 3.5, color: c1, split: "tl-br", color2: c2 },

    // Column x = 34.5
    { x: 34.5, y: 11.5, w: 3.5, h: 3.5, color: c1 },
    { x: 34.5, y: 15.5, w: 3.5, h: 3.5, color: c2, split: "tl-br", color2: c4 },
    { x: 34.5, y: 26.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c4 },
    { x: 34.5, y: 30.5, w: 3.5, h: 3.5, color: c1 },

    // Column x = 30.5
    { x: 30.5, y: 8.5, w: 3.5, h: 3.5, color: c1 },
    { x: 30.5, y: 12.5, w: 3.5, h: 3.5, color: c2, split: "tl-br", color2: c4 },
    { x: 30.5, y: 29.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c4 },
    { x: 30.5, y: 33.5, w: 3.5, h: 3.5, color: c1 },

    // Column x = 26.5
    { x: 26.5, y: 8.5, w: 3.5, h: 3.5, color: c2, split: "tr-bl", color2: c3 },
    { x: 26.5, y: 12.5, w: 3.5, h: 3.5, color: c4 },
    { x: 26.5, y: 29.5, w: 3.5, h: 3.5, color: c4 },
    { x: 26.5, y: 33.5, w: 3.5, h: 3.5, color: c2, split: "tl-br", color2: c3 },

    // Column x = 22.5
    { x: 22.5, y: 8.5, w: 3.5, h: 3.5, color: c3 },
    { x: 22.5, y: 12.5, w: 3.5, h: 3.5, color: c4, split: "tl-br", color2: c5 },
    { x: 22.5, y: 29.5, w: 3.5, h: 3.5, color: c4, split: "tr-bl", color2: c5 },
    { x: 22.5, y: 33.5, w: 3.5, h: 3.5, color: c3 },

    // Column x = 18.5
    { x: 18.5, y: 10.5, w: 3.5, h: 3.5, color: c4 },
    { x: 18.5, y: 14.5, w: 3.5, h: 3.5, color: c5, split: "tr-bl", color2: c4 },
    { x: 18.5, y: 27.5, w: 3.5, h: 3.5, color: c5, split: "tl-br", color2: c4 },
    { x: 18.5, y: 31.5, w: 3.5, h: 3.5, color: c4 },

    // Column x = 14.5
    { x: 14.5, y: 14.5, w: 3.5, h: 3.5, color: c4, split: "tl-br", color2: c5 },
    { x: 14.5, y: 18.5, w: 3.5, h: 3.5, color: c5 },
    { x: 14.5, y: 23.5, w: 3.5, h: 3.5, color: c5 },
    { x: 14.5, y: 27.5, w: 3.5, h: 3.5, color: c4, split: "tr-bl", color2: c5 },

    // Column x = 10.5
    { x: 10.5, y: 12.5, w: 3.5, h: 3.5, color: c5, opacity: 0.95 },
    { x: 10.5, y: 17.5, w: 3.5, h: 3.5, color: c6, split: "tl-br", color2: c5, opacity: 0.95 },
    { x: 10.5, y: 24.5, w: 3.5, h: 3.5, color: c6, split: "tr-bl", color2: c5, opacity: 0.95 },
    { x: 10.5, y: 29.5, w: 3.5, h: 3.5, color: c5, opacity: 0.95 },

    // Column x = 6.5 (Scattered dissolving pixels)
    { x: 6.5, y: 10.5, w: 3, h: 3, color: c6, opacity: 0.9 },
    { x: 6.5, y: 16.5, w: 3, h: 3, color: c5, opacity: 0.9 },
    { x: 6.5, y: 22.5, w: 3, h: 3, color: c6, opacity: 0.9 },
    { x: 6.5, y: 28.5, w: 3, h: 3, color: c5, opacity: 0.9 },
    { x: 6.5, y: 34.5, w: 3, h: 3, color: c6, opacity: 0.85 },

    // Column x = 2.5 (Lighter and more transparent)
    { x: 2.5, y: 14.5, w: 2.5, h: 2.5, color: c7, opacity: 0.8 },
    { x: 2.5, y: 20.5, w: 2.5, h: 2.5, color: c6, opacity: 0.8 },
    { x: 2.5, y: 26.5, w: 2.5, h: 2.5, color: c7, opacity: 0.8 },
    { x: 2.5, y: 32.5, w: 2.5, h: 2.5, color: c6, opacity: 0.75 },

    // Column x = 0 (Leftmost dissolving sparks)
    { x: 0, y: 18.5, w: 2, h: 2, color: c8, opacity: 0.6 },
    { x: 0, y: 24.5, w: 2, h: 2, color: c7, opacity: 0.65 },
    { x: 0, y: 30.5, w: 2, h: 2, color: c8, opacity: 0.55 }
  ];

  return (
    <div className={`flex items-center gap-4 select-none ${className}`} id="omnium-brand-logo">
      <img 
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Omnium Solutions" 
        className="h-14 w-auto shrink-0 transition-transform duration-300 hover:scale-105" 
      />
      
      {/* Corporate Text Branding */}
      <div className="flex flex-col justify-center leading-none">
        <span className={`text-[26px] font-black tracking-tight font-sans ${brandBlue} uppercase`}>
          OMNIUM
        </span>
        <span className={`text-[13px] font-bold tracking-[0.27em] uppercase -mt-1 ${brandBlue}`}>
          SOLUTIONS
        </span>
        <span className={`text-[8.5px] font-semibold tracking-[0.16em] uppercase mt-0.5 ${sloganGray}`}>
          AUTOMAÇÃO E INTEGRAÇÃO
        </span>
      </div>
    </div>
  );
}
