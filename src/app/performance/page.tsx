"use client";

import React, { useState } from "react";
import { useNexova } from "@/context/NexovaContext";
import { monthlyRevenueData } from "@/data/performance";
import { Badge } from "@/components/ui/Badge";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  CheckCircle2,
  Layers,
  Target,
  ArrowUpRight,
  DollarSign,
  Package,
  XCircle,
  Percent,
} from "lucide-react";
import { motion } from "motion/react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  smoothEase,
} from "@/components/motion/MotionPrimitives";

export default function PerformancePage() {
  const { employees, departments, reportingPeriod, setReportingPeriod, metrics } =
    useNexova();

  const chartData = React.useMemo(() => {
    if (reportingPeriod === "this-month") return monthlyRevenueData.slice(4);
    if (reportingPeriod === "this-quarter") return monthlyRevenueData.slice(6);
    return monthlyRevenueData;
  }, [reportingPeriod]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.02} distance={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Business Performance & Analytics
              </h1>
              <span className="p-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <TrendingUp className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Historical billings, digitizing output, order throughput, and department efficiency.
            </p>
          </div>

          {/* Reporting Period Selector */}
          <div className="flex items-center bg-dark-850 border border-white/10 rounded-xl p-1 shadow-sm text-xs">
            <div className="flex items-center gap-1.5 pl-2.5 pr-2 text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline font-medium">Window:</span>
            </div>
            <div className="flex items-center gap-1">
              {[
                { id: "this-month", label: "This Month" },
                { id: "this-quarter", label: "This Quarter" },
                { id: "year-to-date", label: "Year to Date" },
                { id: "custom", label: "Custom" },
              ].map((p) => {
                const isActive = reportingPeriod === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setReportingPeriod(p.id as any)}
                    className={`relative px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePerfPeriodIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Relevant Business Metrics Bar */}
      <StaggerContainer
        staggerChildren={0.03}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Revenue
            </span>
            <div className="text-lg font-mono font-bold text-white mt-1">
              ${metrics.revenue.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              {metrics.revenueComparison}
            </div>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Total Orders
            </span>
            <div className="text-lg font-mono font-bold text-cyan-400 mt-1">
              {metrics.orders}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {metrics.ordersComparison}
            </div>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Completed
            </span>
            <div className="text-lg font-mono font-bold text-emerald-400 mt-1">
              {metrics.completedOrders}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Dispatched</div>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Cancelled
            </span>
            <div className="text-lg font-mono font-bold text-rose-400 mt-1">
              {metrics.cancelledOrders}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Refunded</div>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Completion Rate
            </span>
            <div className="text-lg font-mono font-bold text-white mt-1">
              {metrics.completionRate}%
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">SLA delivery</div>
          </motion.div>
        </StaggerItem>

        <StaggerItem>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.18, ease: smoothEase }}
            className="p-4 rounded-xl bg-dark-850 border border-white/5"
          >
            <span className="text-[11px] text-slate-400 uppercase font-semibold">
              Avg Order Value
            </span>
            <div className="text-lg font-mono font-bold text-white mt-1">
              ${metrics.averageOrderValue.toFixed(2)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Per project</div>
          </motion.div>
        </StaggerItem>
      </StaggerContainer>

      {/* Top 2 Performance Charts Grid */}
      <FadeIn delay={0.1} distance={10}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Performance Trend */}
          <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Revenue Performance Trend
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Monthly billed embroidery invoices vs budget targets
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-mono font-bold text-emerald-400">
                  ${metrics.revenue.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  {metrics.revenueComparison}
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
              </div>

              {chartData.map((d, i) => {
                const hPct = (d.revenue / 55000) * 100;
                const isLast = i === chartData.length - 1;

                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 rounded bg-dark-900 border border-cyan-500/40 text-[10px] font-mono text-white shadow-xl pointer-events-none whitespace-nowrap z-20">
                      ${d.revenue.toLocaleString()}
                    </div>

                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.45, delay: i * 0.04, ease: smoothEase }}
                      style={{ height: `${hPct}%`, originY: 1 }}
                      className={`w-full max-w-[38px] rounded-t-lg transition-colors duration-200 ${
                        isLast
                          ? "bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 shadow-glow"
                          : "bg-gradient-to-t from-dark-750 to-cyan-700/60 group-hover:from-blue-600 group-hover:to-cyan-400"
                      }`}
                    />

                    <span className="mt-2 text-xs font-mono text-slate-400 group-hover:text-white">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span>Target Benchmark: $50,000 / month</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                104.2% pacing
              </span>
            </div>
          </div>

          {/* Order Throughput: Received vs Completed */}
          <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <BarChart3 className="w-4 h-4" />
                  </span>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Order Throughput & Delivery
                  </h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Intake volume vs completed & proofed jobs
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-mono font-bold text-cyan-400">
                  {metrics.completedOrders} / {metrics.orders}
                </div>
                <div className="text-[11px] text-slate-400">
                  {Math.round((metrics.completedOrders / metrics.orders) * 100)}% completion rate
                </div>
              </div>
            </div>

            {/* Comparison Bar Group */}
            <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
                <div className="border-b border-dashed border-white" />
              </div>

              {chartData.map((d, i) => {
                const recPct = (d.orders / 200) * 100;
                const compPct = (d.completed / 200) * 100;

                return (
                  <div
                    key={d.month}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  >
                    <div className="flex items-end gap-1 w-full justify-center">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.45, delay: i * 0.04, ease: smoothEase }}
                        style={{ height: `${recPct}%`, originY: 1 }}
                        className="w-3 sm:w-4 rounded-t bg-blue-600/70 group-hover:bg-blue-500 transition-colors"
                        title={`${d.orders} received`}
                      />
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.45, delay: i * 0.04 + 0.02, ease: smoothEase }}
                        style={{ height: `${compPct}%`, originY: 1 }}
                        className="w-3 sm:w-4 rounded-t bg-emerald-500/80 group-hover:bg-emerald-400 transition-colors"
                        title={`${d.completed} completed`}
                      />
                    </div>

                    <span className="mt-2 text-xs font-mono text-slate-400 group-hover:text-white">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  <span>Orders Received</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                  <span>Completed</span>
                </div>
              </div>

              <span className="font-mono text-[11px] text-slate-300">
                Avg Turnaround: 24-48 hrs
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Department Performance Matrix */}
      <FadeIn delay={0.14} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Department Efficiency & SLA Adherence
              </h3>
              <p className="text-xs text-slate-400">
                Comparative capacity, operational volume, and target achievement
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {departments.map((dept) => {
              const isDigitizing = dept.name === "Digitizing / Production";

              return (
                <div
                  key={dept.name}
                  className="p-4 rounded-xl bg-dark-800/80 border border-white/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {dept.name}
                    </span>
                    <Badge variant="cyan" size="sm">
                      {dept.memberCount} staff
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Workload Capacity:</span>
                      <span className="font-mono font-bold text-slate-200">
                        {dept.workloadPercent}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-dark-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dept.workloadPercent}%` }}
                        transition={{ duration: 0.6, ease: smoothEase }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                    <span className="text-slate-400">
                      {isDigitizing ? "Monthly Output:" : "Booked Billings:"}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {dept.outputMetric}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Active Orders:</span>
                    <span className="font-mono text-slate-300">
                      {dept.activeOrders} in queue
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Team Output Ranking Table */}
      <FadeIn delay={0.18} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl shadow-card overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Target className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Top Production & Sales Contributors
                </h3>
                <p className="text-xs text-slate-400">
                  Specialist breakdown by volume, completion rate, and financial impact
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="border-b border-white/10 bg-dark-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Specialist</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-center">Handled</th>
                  <th className="py-3 px-4 text-center">Completed</th>
                  <th className="py-3 px-4 text-right">Production Output / Sales</th>
                  <th className="py-3 px-4 text-right">Success Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {employees.map((emp) => {
                  const isDigitizing = emp.department === "Digitizing / Production";

                  return (
                    <tr
                      key={emp.id}
                      className="hover:bg-dark-800/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
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

                      <td className="py-3.5 px-4">
                        <Badge variant="outline" size="sm">
                          {emp.department}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono font-medium text-slate-200">
                        {emp.ordersHandled}
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-emerald-400 font-semibold">
                        {emp.completedOrders}
                      </td>

                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        {isDigitizing
                          ? emp.stitchOutput || `${emp.currentWorkload} active`
                          : `$${(emp.revenueOrSales || 0).toLocaleString()}`}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span
                            className={`font-mono font-bold ${
                              emp.completionRate >= 95
                                ? "text-emerald-400"
                                : "text-cyan-400"
                            }`}
                          >
                            {emp.completionRate}%
                          </span>
                          <div className="w-14 h-1.5 rounded-full bg-dark-700 overflow-hidden">
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
      </FadeIn>
    </div>
  );
}
