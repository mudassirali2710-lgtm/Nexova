"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useNexova } from "@/context/NexovaContext";
import { Order, OrderStatus, EmbroideryPlacement, PaymentStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { AddOrderModal } from "@/components/orders/AddOrderModal";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { Search, Plus, Eye, X } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/motion/MotionPrimitives";

function OrdersContent() {
  const { orders } = useNexova();
  const searchParams = useSearchParams();

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [placementFilter, setPlacementFilter] = useState<string>("All");
  const [teamFilter, setTeamFilter] = useState<string>("All");
  const [paymentFilter, setPaymentFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<
    "date-desc" | "date-asc" | "amount-desc" | "remaining-desc"
  >("date-desc");

  // Read status or id from searchParams if present
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam) {
      setStatusFilter(statusParam);
    }
    const idParam = searchParams.get("id");
    if (idParam) {
      const match = orders.find((o) => o.id === idParam);
      if (match) setSelectedOrder(match);
    }
    const searchUrlParam = searchParams.get("search");
    if (searchUrlParam) {
      setSearchTerm(searchUrlParam);
    }
  }, [searchParams, orders]);

  const placements: (EmbroideryPlacement | "All")[] = [
    "All",
    "Cap Logo",
    "Left Chest Logo",
    "Front Chest Logo",
    "Jacket Back",
    "Sleeve Logo",
    "Bag Logo",
    "Hat Logo",
    "Uniform Logo",
  ];

  const statuses = [
    "All",
    "New",
    "In Review",
    "Digitizing",
    "Production / Ready",
    "Completed",
    "Cancelled",
  ];

  const paymentStatuses = ["All", "Paid in Full", "Partially Paid", "Unpaid"];

  const departments = [
    "All",
    "Digitizing / Production",
    "Sales & Calls",
    "Email / Outreach",
    "Promotion / Marketing",
    "Deal Closing",
    "Management",
  ];

  // Filter and Sort Logic
  const filteredAndSortedOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.designName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.assignedEmployee.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || order.status === statusFilter;

        const matchesPlacement =
          placementFilter === "All" || order.placement === placementFilter;

        const matchesTeam =
          teamFilter === "All" || order.assignedDepartment === teamFilter;

        const matchesPayment =
          paymentFilter === "All" || order.paymentStatus === paymentFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPlacement &&
          matchesTeam &&
          matchesPayment
        );
      })
      .sort((a, b) => {
        if (sortBy === "date-desc") {
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
        }
        if (sortBy === "date-asc") {
          return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        }
        if (sortBy === "amount-desc") {
          return b.totalAmount - a.totalAmount;
        }
        if (sortBy === "remaining-desc") {
          return b.remainingBalance - a.remainingBalance;
        }
        return 0;
      });
  }, [orders, searchTerm, statusFilter, placementFilter, teamFilter, paymentFilter, sortBy]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setPlacementFilter("All");
    setTeamFilter("All");
    setPaymentFilter("All");
    setSortBy("date-desc");
  };

  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "All" ||
    placementFilter !== "All" ||
    teamFilter !== "All" ||
    paymentFilter !== "All";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <FadeIn delay={0.02} distance={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Order Management
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-dark-800 border border-white/10 text-cyan-300 font-mono text-xs font-semibold">
                {filteredAndSortedOrders.length} orders
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track digitizing jobs, stitch specs, file proofs, and production queues.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Order</span>
          </motion.button>
        </div>
      </FadeIn>

      {/* Filter and Search Bar */}
      <FadeIn delay={0.06} distance={8}>
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by ID, customer, brand, design..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    Status: {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Placement Filter */}
            <div>
              <select
                value={placementFilter}
                onChange={(e) => setPlacementFilter(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {placements.map((p) => (
                  <option key={p} value={p}>
                    Placement: {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Status Filter */}
            <div>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                {paymentStatuses.map((p) => (
                  <option key={p} value={p}>
                    Payment: {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Row: Department Filter & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Department:</span>
              <div className="flex flex-wrap gap-1">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setTeamFilter(dept)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                      teamFilter === dept
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {dept === "Digitizing / Production" ? "Digitizing" : dept}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-dark-800 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
              >
                <option value="date-desc">Sort: Newest First</option>
                <option value="date-asc">Sort: Oldest First</option>
                <option value="amount-desc">Sort: Highest Total</option>
                <option value="remaining-desc">Sort: Highest Remaining Balance</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Orders Table */}
      <FadeIn delay={0.1} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[1050px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Company / Brand</th>
                <th className="py-3.5 px-4">Design & Placement</th>
                <th className="py-3.5 px-4">Assigned Team</th>
                <th className="py-3.5 px-4 text-right">Upfront Paid</th>
                <th className="py-3.5 px-4 text-right">Remaining</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-center">Payment</th>
                <th className="py-3.5 px-4">Order Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAndSortedOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-dark-800/80 transition-colors group cursor-pointer"
                >
                  {/* Order ID */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-cyan-400 group-hover:underline">
                      {order.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">
                      {order.customerName}
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3.5 px-4">
                    <span className="text-slate-300 font-medium">
                      {order.company}
                    </span>
                  </td>

                  {/* Design & Placement */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200">
                      {order.designName}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded bg-dark-750 text-cyan-300 border border-white/5 text-[10px] font-mono">
                        {order.placement}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {order.stitchCount.toLocaleString()} sts
                      </span>
                    </div>
                  </td>

                  {/* Assigned Team */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium truncate max-w-[130px]">
                      {order.assignedEmployee}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                      {order.assignedDepartment}
                    </div>
                  </td>

                  {/* Upfront Payment */}
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                    ${order.upfrontAmount}
                  </td>

                  {/* Remaining Balance */}
                  <td className="py-3.5 px-4 text-right font-mono text-amber-400 font-semibold">
                    ${order.remainingBalance}
                  </td>

                  {/* Total Amount */}
                  <td className="py-3.5 px-4 text-right font-mono text-white font-bold">
                    ${order.totalAmount}
                  </td>

                  {/* Payment Status */}
                  <td className="py-3.5 px-4 text-center">
                    <Badge status={order.paymentStatus} size="sm">
                      {order.paymentStatus}
                    </Badge>
                  </td>

                  {/* Order Date */}
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    {order.orderDate}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <Badge status={order.status} size="sm">
                      {order.status}
                    </Badge>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrder(order);
                      }}
                      className="p-1.5 rounded-lg bg-dark-800 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="Inspect Order"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedOrders.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-xs space-y-2">
            <p className="text-sm font-semibold text-slate-400">
              No orders found matching your criteria.
            </p>
            <p>Try clearing filters or checking your search query.</p>
            <button
              onClick={clearAllFilters}
              className="mt-2 px-3 py-1.5 rounded-lg bg-dark-800 text-cyan-400 text-xs font-semibold hover:bg-dark-750"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      </FadeIn>

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-xs">Loading orders...</div>}>
      <OrdersContent />
    </Suspense>
  );
}
