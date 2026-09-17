import React from "react";
import { OrderStatus, PaymentStatus } from "@/types";

interface BadgeProps {
  children?: React.ReactNode;
  variant?: "default" | "status" | "outline" | "cyan" | "emerald" | "amber" | "rose" | "purple";
  status?: OrderStatus | PaymentStatus | string;
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  status,
  size = "md",
  className = "",
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
  };

  if (status) {
    const statusMap: Record<string, string> = {
      New: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      "In Review": "bg-amber-500/15 text-amber-300 border-amber-500/30",
      Digitizing: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      "Production / Ready": "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      Cancelled: "bg-slate-500/20 text-slate-400 border-slate-600/30",
      // Payment statuses
      "Paid in Full": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      "Partially Paid": "bg-amber-500/15 text-amber-300 border-amber-500/30",
      Unpaid: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      // Customer tiers
      Active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      VIP: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      Inactive: "bg-slate-500/20 text-slate-400 border-slate-600/30",
    };

    const matched = statusMap[status] || "bg-slate-800 text-slate-300 border-white/10";

    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${matched} ${sizeClasses[size]} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        {children || status}
      </span>
    );
  }

  const variantMap = {
    default: "bg-dark-750 text-slate-300 border-white/10",
    status: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    outline: "border border-white/15 text-slate-300 bg-transparent",
    cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantMap[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
