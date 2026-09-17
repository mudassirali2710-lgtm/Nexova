"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

interface MetricCardProps {
  title: string;
  value: string | number;
  comparison: string;
  isPositive?: boolean;
  icon: LucideIcon;
  supportingText: string;
  accentColor: "blue" | "cyan" | "teal" | "emerald";
}

export function MetricCard({
  title,
  value,
  comparison,
  isPositive = true,
  icon: Icon,
  supportingText,
  accentColor,
}: MetricCardProps) {
  const accentBorders = {
    blue: "hover:border-blue-500/40 from-blue-500/10 via-transparent to-transparent",
    cyan: "hover:border-cyan-500/40 from-cyan-500/10 via-transparent to-transparent",
    teal: "hover:border-teal-500/40 from-teal-500/10 via-transparent to-transparent",
    emerald: "hover:border-emerald-500/40 from-emerald-500/10 via-transparent to-transparent",
  };

  const iconColors = {
    blue: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    cyan: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
    teal: "text-teal-400 bg-teal-500/15 border-teal-500/30",
    emerald: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: smoothEase }}
      className="relative group bg-dark-850 border border-white/10 hover:border-white/20 rounded-2xl p-5 shadow-card overflow-hidden flex flex-col justify-between"
    >
      {/* Background soft ambient gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accentBorders[accentColor]} opacity-60 pointer-events-none transition-opacity duration-300 group-hover:opacity-100`}
      />

      <div>
        {/* Top row: Title + Icon */}
        <div className="flex items-center justify-between gap-3 relative z-10">
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
            {title}
          </span>
          <div
            className={`p-2.5 rounded-xl border ${iconColors[accentColor]} transition-transform duration-300 group-hover:scale-110 shadow-sm`}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>

        {/* Main Value */}
        <div className="mt-3 relative z-10">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            {value}
          </div>
        </div>
      </div>

      {/* Comparison and Supporting Text */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs relative z-10">
        <div
          className={`flex items-center gap-1 font-semibold ${isPositive ? "text-emerald-400" : "text-rose-400"
            }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5" />
          )}
          <span>{comparison}</span>
        </div>

        <span className="text-slate-400 text-[11px] truncate ml-2">
          {supportingText}
        </span>
      </div>
    </motion.div>
  );
}
