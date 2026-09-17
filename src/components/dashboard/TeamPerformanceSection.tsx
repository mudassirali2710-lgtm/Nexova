"use client";

import React from "react";
import Link from "next/link";
import { Employee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Users, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

interface TeamPerformanceSectionProps {
  employees: Employee[];
}

export function TeamPerformanceSection({ employees }: TeamPerformanceSectionProps) {
  const featured = employees.slice(0, 6);

  return (
    <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Team Performance
            </h3>
            <p className="text-xs text-slate-400">
              Specialist throughput and sales delivery
            </p>
          </div>
        </div>

        <Link
          href="/team"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>View All Team</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Employee</th>
              <th className="py-3 px-3">Department</th>
              <th className="py-3 px-3 text-center">Handled</th>
              <th className="py-3 px-3 text-center">Completed</th>
              <th className="py-3 px-3 text-right">Production / Sales</th>
              <th className="py-3 px-3 text-right">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {featured.map((emp) => {
              const isDigitizing = emp.department === "Digitizing / Production";

              return (
                <tr
                  key={emp.id}
                  className="hover:bg-dark-800/60 transition-colors group"
                >
                  {/* Employee Name & Role */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-tr ${
                          emp.avatarBg || "from-blue-600 to-cyan-500"
                        } flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0`}
                      >
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {emp.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{emp.role}</div>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-3">
                    <Badge variant="outline" size="sm">
                      {emp.department}
                    </Badge>
                  </td>

                  {/* Orders Handled */}
                  <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-200">
                    {emp.ordersHandled}
                  </td>

                  {/* Completed */}
                  <td className="py-3.5 px-3 text-center">
                    <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      {emp.completedOrders}
                    </span>
                  </td>

                  {/* Production / Sales Output */}
                  <td className="py-3.5 px-3 text-right font-mono font-semibold text-slate-100">
                    {isDigitizing
                      ? emp.stitchOutput || `${emp.currentWorkload} active files`
                      : `$${(emp.revenueOrSales || 0).toLocaleString()}`}
                  </td>

                  {/* Performance */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span
                        className={`font-mono font-bold text-xs ${
                          emp.completionRate >= 95
                            ? "text-emerald-400"
                            : "text-cyan-400"
                        }`}
                      >
                        {emp.completionRate}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-dark-700 overflow-hidden shrink-0">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(emp.completionRate, 100)}%` }}
                          transition={{ duration: 0.65, ease: smoothEase }}
                          className={`h-full rounded-full ${
                            emp.completionRate >= 95
                              ? "bg-gradient-to-r from-teal-500 to-emerald-400"
                              : "bg-gradient-to-r from-blue-500 to-cyan-400"
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
