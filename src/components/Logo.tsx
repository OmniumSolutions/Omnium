import React from "react";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const brandBlue = light ? "text-white" : "text-[#0B2F61]";
  const sloganGray = light ? "text-blue-200/80" : "text-[#556F8D]";

  return (
    <div className={`flex items-center gap-4 sm:gap-6 select-none ${className}`} id="omnium-brand-logo">
      <img 
        src={`${import.meta.env.BASE_URL}logo.png?v=11`}
        alt="Omnium Solutions" 
        className={`h-22 sm:h-26 w-auto shrink-0 ${light ? "brightness-0 invert opacity-90" : ""} transition-transform duration-300 hover:scale-105`}
      />
      
      {/* Corporate Text Branding */}
      <div className="flex flex-col justify-center leading-none">
        <span className={`text-[28px] sm:text-[32px] font-black tracking-tight font-sans leading-none ${brandBlue} uppercase`}>
          OMNIUM
        </span>
        <span className={`text-[14px] sm:text-[16px] font-bold tracking-[0.28em] uppercase leading-tight mt-0.5 ${brandBlue}`}>
          SOLUTIONS
        </span>
        <span className={`text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase leading-tight mt-1.5 ${sloganGray}`}>
          AUTOMAÇÃO E INTEGRAÇÃO
        </span>
      </div>
    </div>
  );
}
