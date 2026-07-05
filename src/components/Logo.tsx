import React from "react";

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = "", light = false }: LogoProps) {
  const brandBlue = light ? "text-white" : "text-[#0B2F61]";
  const sloganGray = light ? "text-blue-200/80" : "text-[#556F8D]";

  return (
    <div className={`flex items-center gap-4 select-none ${className}`} id="omnium-brand-logo">
      <img 
        src={`${import.meta.env.BASE_URL}logo.png?v=4`}
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
