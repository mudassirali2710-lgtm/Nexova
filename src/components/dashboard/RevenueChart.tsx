"use client";

import React, { useState } from "react";
import { monthlyRevenueData } from "@/data/performance";
import { ReportingPeriod } from "@/types";
import { TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

interface RevenueChartProps {
  period: ReportingPeriod;
  comparisonText: string;
}

export function RevenueChart({ period, comparisonText }: RevenueChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Filter or scale points based on period
  const data = React.useMemo(() => {
    if (period === "this-month") {
      // Last 6 months focus leading into September
      return monthlyRevenueData.slice(3);
    } else if (period === "this-quarter") {
      // Q3 (Jul, Aug, Sep)
      return monthlyRevenueData.slice(6);
    } else {
      // Full Jan to Sep
      return monthlyRevenueData;
    }
  }, [period]);

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 55000);

  return (
    <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white tracking-wide">
              Revenue Overview
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Embroidery digitizing and custom production billings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {comparisonText}
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative pt-4">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="border-b border-dashed border-white" />
          <div className="border-b border-dashed border-white" />
          <div className="border-b border-dashed border-white" />
          <div className="border-b border-white/40" />
        </div>

        {/* Dynamic Bars & Curves */}
        <div className="relative h-56 flex items-end justify-between gap-2 sm:gap-4 px-2">
          {data.map((item, idx) => {
            const heightPercent = (item.revenue / maxRevenue) * 100;
            const targetHeightPercent = (item.target / maxRevenue) * 100;
            const isHovered = hoveredIdx === idx;
            const isLatest = idx === data.length - 1;

            return (
              <div
                key={item.month}
                className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -4 }}
                      transition={{ duration: 0.15, ease: smoothEase }}
                      className="absolute -top-16 z-30 flex flex-col items-center pointer-events-none"
                    >
                      <div className="px-3 py-2 rounded-xl bg-dark-950/95 border border-cyan-500/40 shadow-2xl text-center backdrop-blur-md">
                        <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                          {item.month} 2024
                        </div>
                        <div className="text-sm font-extrabold text-white">
                          ${item.revenue.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {item.completed} completed orders
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-dark-950 rotate-45 border-r border-b border-cyan-500/40 -mt-1" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Target Marker Line */}
                <div
                  className="absolute w-full border-t-2 border-dashed border-sky-400/30 pointer-events-none"
                  style={{ bottom: `${targetHeightPercent}%` }}
                />

                {/* Bar Column with Gradient Fill */}
                <div className="relative w-full max-w-[42px] flex items-end">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: idx * 0.04,
                      ease: smoothEase,
                    }}
                    style={{
                      height: `${heightPercent}%`,
                      originY: 1,
                    }}
                    className={`w-full rounded-t-lg relative overflow-hidden transition-colors duration-200 ${
                      isLatest
                        ? "bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 shadow-glow"
                        : isHovered
                        ? "bg-gradient-to-t from-blue-600 to-cyan-500"
                        : "bg-gradient-to-t from-dark-750 via-dark-700 to-dark-600 border border-white/10"
                    }`}
                  >
                    {/* Top highlight cap */}
                    <div className="w-full h-1 bg-white/40" />
                  </motion.div>
                </div>

                {/* Month label */}
                <span
                  className={`mt-3 text-xs font-medium transition-colors ${
                    isLatest
                      ? "text-cyan-400 font-bold"
                      : isHovered
                      ? "text-white"
                      : "text-slate-400"
                  }`}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend & Details */}
      <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-gradient-to-t from-blue-600 to-cyan-400 inline-block" />
            <span className="text-slate-300 font-medium">Billed Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t-2 border-dashed border-sky-400/60 inline-block" />
            <span>Target Benchmark</span>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Average Order Value: <span className="text-slate-200 font-semibold">$261.40</span>
        </div>
      </div>
    </div>
  );
}
