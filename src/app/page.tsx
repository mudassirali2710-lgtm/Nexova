"use client";

import React from "react";
import { useNexova } from "@/context/NexovaContext";
import { MetricCard } from "@/components/ui/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { WorkflowBar } from "@/components/ui/WorkflowBar";
import { TeamPerformanceSection } from "@/components/dashboard/TeamPerformanceSection";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import {
  DollarSign,
  Package,
  CreditCard,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";

export default function OverviewPage() {
  const { metrics, reportingPeriod, orders, employees } = useNexova();

  const periodLabels: Record<string, string> = {
    "this-month": "September 2024",
    "this-quarter": "Q3 2024 (Jul - Sep)",
    "year-to-date": "Fiscal 2024 YTD",
    custom: "Custom Period",
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <FadeIn delay={0.02} distance={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Good morning, Marcus
              </h1>
              <span className="p-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Here’s the latest overview of Nexova’s business performance for{" "}
              <span className="text-cyan-400 font-semibold">
                {periodLabels[reportingPeriod]}
              </span>
              .
            </p>
          </div>

          {/* Operational Status Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-dark-850 border border-white/10 shadow-sm text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-medium">
              Production Line Status:{" "}
              <span className="text-emerald-400 font-bold">Optimal (94% Cap)</span>
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Main Business KPI Cards with Staggered Entrance */}
      <StaggerContainer
        staggerChildren={0.04}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {/* Total Revenue */}
        <StaggerItem>
          <MetricCard
            title="Total Revenue"
            value={`$${metrics.revenue.toLocaleString()}`}
            comparison={metrics.revenueComparison}
            isPositive={true}
            icon={DollarSign}
            supportingText="Gross billings"
            accentColor="cyan"
          />
        </StaggerItem>

        {/* Total Orders */}
        <StaggerItem>
          <MetricCard
            title="Total Orders"
            value={metrics.orders}
            comparison={metrics.ordersComparison}
            isPositive={true}
            icon={Package}
            supportingText="All embroidery jobs"
            accentColor="blue"
          />
        </StaggerItem>

        {/* Upfront Payments */}
        <StaggerItem>
          <MetricCard
            title="Upfront Paid"
            value={`$${metrics.upfrontPayments.toLocaleString()}`}
            comparison={metrics.upfrontComparison}
            isPositive={true}
            icon={CreditCard}
            supportingText="Secured deposits"
            accentColor="teal"
          />
        </StaggerItem>

        {/* Outstanding Balance */}
        <StaggerItem>
          <MetricCard
            title="Outstanding Balance"
            value={`$${metrics.outstandingBalance.toLocaleString()}`}
            comparison="Due on dispatch"
            isPositive={true}
            icon={Clock}
            supportingText="Pending collection"
            accentColor="emerald"
          />
        </StaggerItem>

        {/* Completed Orders */}
        <StaggerItem>
          <MetricCard
            title="Completed Orders"
            value={metrics.completedOrders}
            comparison={`${metrics.cancelledOrders} cancelled`}
            isPositive={true}
            icon={CheckCircle2}
            supportingText="Dispatched proofs & files"
            accentColor="emerald"
          />
        </StaggerItem>
      </StaggerContainer>

      {/* Order Workflow Pipeline Section */}
      <FadeIn delay={0.12} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Order Workflow Pipeline
                </h3>
                <p className="text-xs text-slate-400">
                  Live embroidery stage counts from customer intake to machine proofing
                </p>
              </div>
            </div>
          </div>

          {/* Horizontal Pipeline Workflow */}
          <WorkflowBar workflowCounts={metrics.workflow} clickable={true} />
        </div>
      </FadeIn>

      {/* Revenue Chart & Team Section Grid */}
      <FadeIn delay={0.16} distance={10}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart
            period={reportingPeriod}
            comparisonText={metrics.revenueComparison}
          />

          <TeamPerformanceSection employees={employees} />
        </div>
      </FadeIn>

      {/* Recent Orders Table */}
      <FadeIn delay={0.2} distance={10}>
        <RecentOrdersTable orders={orders} />
      </FadeIn>
    </div>
  );
}
