import React from "react";

interface NexovaLogoProps {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}

export function NexovaLogo({
  size = "md",
  showWordmark = true,
  className = "",
}: NexovaLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Thread Node & Interlocking Vector Mark */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900 border border-white/10 shadow-glow p-1.5 ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="threadGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="nodeGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0D9488" />
            </linearGradient>
            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connected Thread Geometry: Continuous geometric loop tracing 'N' vector */}
          <path
            d="M 9 31 L 9 12 C 9 8.5 12.5 7 15.5 9 L 24.5 31 C 27.5 33 31 31.5 31 28 L 31 9"
            stroke="url(#threadGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stitch Intersecting Cross-Tension Vectors */}
          <path
            d="M 12 20 L 28 20"
            stroke="rgba(56, 189, 248, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="2 3"
            strokeLinecap="round"
          />

          {/* Precision Nodes (Digitizing control points) */}
          <circle cx="9" cy="12" r="2.2" fill="#06B6D4" />
          <circle cx="31" cy="28" r="2.2" fill="#10B981" />
          <circle cx="20" cy="20" r="1.8" fill="#38BDF8" filter="url(#subtleGlow)" />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider uppercase text-white ${textSizes[size]} font-sans`}
            >
              Nexova
            </span>
            <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono font-medium">
              Studio
            </span>
          </div>
          <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium -mt-1">
            Embroidery Digitizing & Ops
          </span>
        </div>
      )}
    </div>
  );
}
