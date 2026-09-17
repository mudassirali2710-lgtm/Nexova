"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Order } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import { Search, Eye, ArrowRight, Layers } from "lucide-react";
import { motion } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.designName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const statuses = [
    "All",
    "New",
    "In Review",
    "Digitizing",
    "Production / Ready",
    "Completed",
    "Cancelled",
  ];

  return (
    <div className="bg-dark-850 border border-white/10 rounded-2xl p-6 shadow-card space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Recent Embroidery Orders
            </h3>
            <p className="text-xs text-slate-400">
              Live digitizing queue and production fulfillment
            </p>
          </div>
        </div>

        <Link
          href="/orders"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <span>View All Orders</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Quick Search & Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search order ID, company, design..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-800 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedStatus === status
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left text-xs border-collapse min-w-[920px]">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Order ID</th>
              <th className="py-3 px-3">Customer & Company</th>
              <th className="py-3 px-3">Design & Placement</th>
              <th className="py-3 px-3">Order Date</th>
              <th className="py-3 px-3 text-right">Upfront Paid</th>
              <th className="py-3 px-3 text-right">Remaining</th>
              <th className="py-3 px-3 text-right">Total</th>
              <th className="py-3 px-3 text-center">Payment</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.slice(0, 8).map((order) => (
              <tr
                key={order.id}
                className="hover:bg-dark-800/60 transition-colors group cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                {/* Order ID */}
                <td className="py-3.5 px-3">
                  <span className="font-mono font-bold text-cyan-400 group-hover:underline">
                    {order.id}
                  </span>
                </td>

                {/* Customer & Company */}
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-white">
                    {order.company}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {order.customerName}
                  </div>
                </td>

                {/* Design & Placement */}
                <td className="py-3.5 px-3">
                  <div className="font-medium text-slate-200">
                    {order.designName}
                  </div>
                  <div className="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-dark-750 text-slate-300 border border-white/5 text-[10px] font-mono">
                    {order.placement}
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px]">
                  {order.orderDate}
                </td>

                {/* Upfront Paid */}
                <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                  ${order.upfrontAmount}
                </td>

                {/* Remaining Balance */}
                <td className="py-3.5 px-3 text-right font-mono text-amber-400 font-semibold">
                  ${order.remainingBalance}
                </td>

                {/* Total Amount */}
                <td className="py-3.5 px-3 text-right font-mono text-white font-bold">
                  ${order.totalAmount}
                </td>

                {/* Payment Status */}
                <td className="py-3.5 px-3 text-center">
                  <Badge status={order.paymentStatus} size="sm">
                    {order.paymentStatus}
                  </Badge>
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 text-center">
                  <Badge status={order.status} size="sm">
                    {order.status}
                  </Badge>
                </td>

                {/* Action */}
                <td className="py-3.5 px-3 text-right">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOrder(order);
                    }}
                    className="p-1.5 rounded-lg bg-dark-800 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title="View details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </motion.button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-xs">
          No orders matched your search or status filter.
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
