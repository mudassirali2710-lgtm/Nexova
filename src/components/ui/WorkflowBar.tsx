"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FilePlus,
  SearchCheck,
  Cpu,
  Layers,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

interface WorkflowBarProps {
  workflowCounts: {
    new: number;
    inReview: number;
    digitizing: number;
    production: number;
    completed: number;
    cancelled: number;
  };
  className?: string;
  clickable?: boolean;
}

export function WorkflowBar({
  workflowCounts,
  className = "",
  clickable = true,
}: WorkflowBarProps) {
  const router = useRouter();

  const stages = [
    {
      id: "New",
      label: "New",
      count: workflowCounts.new,
      icon: FilePlus,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/25",
      badge: "bg-blue-500/20 text-blue-300",
      routeParam: "New",
    },
    {
      id: "In Review",
      label: "In Review",
      count: workflowCounts.inReview,
      icon: SearchCheck,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/25",
      badge: "bg-amber-500/20 text-amber-300",
      routeParam: "In Review",
    },
    {
      id: "Digitizing",
      label: "Digitizing",
      count: workflowCounts.digitizing,
      icon: Cpu,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/25",
      badge: "bg-purple-500/20 text-purple-300",
      routeParam: "Digitizing",
    },
    {
      id: "Production / Ready",
      label: "Production / Ready",
      count: workflowCounts.production,
      icon: Layers,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/25",
      badge: "bg-cyan-500/20 text-cyan-300",
      routeParam: "Production / Ready",
    },
    {
      id: "Completed",
      label: "Completed",
      count: workflowCounts.completed,
      icon: CheckCircle2,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/25",
      badge: "bg-emerald-500/20 text-emerald-300",
      routeParam: "Completed",
    },
  ];

  const totalActive =
    workflowCounts.new +
    workflowCounts.inReview +
    workflowCounts.digitizing +
    workflowCounts.production;

  const handleClick = (param: string) => {
    if (clickable) {
      router.push(`/orders?status=${encodeURIComponent(param)}`);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Horizontal workflow cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.id}
              onClick={() => handleClick(stage.routeParam)}
              whileHover={clickable ? { y: -3, scale: 1.01 } : undefined}
              whileTap={clickable ? { scale: 0.98 } : undefined}
              transition={{ duration: 0.18, ease: smoothEase }}
              className={`relative flex flex-col justify-between p-4 rounded-xl bg-dark-850 border ${
                stage.border
              } ${
                clickable ? "cursor-pointer hover:bg-dark-800" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stage.bg} ${stage.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${stage.badge}`}
                >
                  {stage.count}
                </span>
              </div>

              <div>
                <div className="text-xs uppercase font-semibold tracking-wider text-slate-400 flex items-center justify-between">
                  <span>{stage.label}</span>
                  {idx < stages.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block" />
                  )}
                </div>
                <div className="text-xl font-bold text-white mt-0.5 font-sans">
                  {stage.count} <span className="text-xs font-normal text-slate-400">orders</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cancelled badge bar & active throughput helper */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-dark-850/60 border border-white/5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            Active in-flight workload:{" "}
            <span className="text-white font-bold">{totalActive}</span> orders
          </span>
        </div>

        <motion.div
          whileHover={clickable ? { scale: 1.02 } : undefined}
          whileTap={clickable ? { scale: 0.98 } : undefined}
          onClick={() => handleClick("Cancelled")}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-lg bg-dark-800 border border-white/10 ${
            clickable ? "cursor-pointer hover:border-rose-500/40 hover:text-rose-300 transition-colors" : ""
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>
            Cancelled:{" "}
            <span className="text-slate-200 font-bold">
              {workflowCounts.cancelled}
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
