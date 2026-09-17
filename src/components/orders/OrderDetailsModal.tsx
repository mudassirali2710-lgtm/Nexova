"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Order, OrderStatus } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useNexova } from "@/context/NexovaContext";
import {
  User,
  Building,
  Phone,
  Mail,
  Layers,
  Sparkles,
  DollarSign,
  Clock,
} from "lucide-react";

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  const { updateOrderStatus } = useNexova();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "">("");
  const [statusNote, setStatusNote] = useState("");

  if (!order) return null;

  const statuses: OrderStatus[] = [
    "New",
    "In Review",
    "Digitizing",
    "Production / Ready",
    "Completed",
    "Cancelled",
  ];

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus || selectedStatus === order.status) return;

    updateOrderStatus(
      order.id,
      selectedStatus,
      statusNote || `Updated status to ${selectedStatus}`
    );
    setStatusNote("");
    setSelectedStatus("");
  };

  const balanceRemaining = order.remainingBalance ?? (order.totalAmount - order.upfrontAmount);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order Specification — ${order.id}`}
      subtitle={`${order.company} • ${order.designName}`}
      maxWidth="3xl"
    >
      <div className="space-y-6">
        {/* Top Status Banner & Quick Status Changer */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-dark-800 border border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">
              Current Workflow State:
            </span>
            <Badge status={order.status} size="md">
              {order.status}
            </Badge>
            <Badge status={order.paymentStatus} size="sm">
              {order.paymentStatus}
            </Badge>
          </div>

          <form
            onSubmit={handleStatusUpdate}
            className="flex items-center gap-2"
          >
            <select
              value={selectedStatus || order.status}
              onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
              className="bg-dark-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-medium"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  Change to: {s}
                </option>
              ))}
            </select>
            {selectedStatus && selectedStatus !== order.status && (
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold transition-colors animate-in fade-in"
              >
                Apply
              </button>
            )}
          </form>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer & Company Details */}
          <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Customer & Account</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="text-white font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Company:</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  {order.company}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email:</span>
                <a
                  href={`mailto:${order.email}`}
                  className="text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  {order.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-200 font-mono flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  {order.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Embroidery Technical Specifications */}
          <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Embroidery & Digitizing Specs</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Design Name:</span>
                <span className="text-white font-semibold">{order.designName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Placement:</span>
                <span className="px-2 py-0.5 rounded bg-dark-750 text-cyan-300 border border-white/10 font-medium">
                  {order.placement}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Stitch Count:</span>
                <span className="text-slate-200 font-mono font-bold">
                  {order.stitchCount.toLocaleString()} stitches
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Thread Colors & Format:</span>
                <span className="text-slate-200 font-mono">
                  {order.threadColors} colors • {order.fileFormat}
                </span>
              </div>
              {order.dimensions && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dimensions:</span>
                  <span className="text-slate-300 font-mono">{order.dimensions}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operational Routing & Financial Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assignment */}
          <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Team Assignment</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Department:</span>
                <Badge variant="outline" size="sm">
                  {order.assignedDepartment}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Assigned Specialist:</span>
                <span className="text-white font-medium">
                  {order.assignedEmployee}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Order Date:</span>
                <span className="text-slate-300 font-mono">{order.orderDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Estimated Due Date:</span>
                <span className="text-cyan-300 font-mono font-semibold">
                  {order.dueDate}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>Payment & Balance</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Upfront Deposit:</span>
                <span className="text-emerald-400 font-bold">
                  ${order.upfrontAmount.toFixed(2)} (Paid)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Total Order Amount:</span>
                <span className="text-white font-bold">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-white/10">
                <span className="text-slate-400">Remaining Balance:</span>
                <span
                  className={`font-bold ${
                    balanceRemaining > 0 ? "text-amber-400" : "text-emerald-400"
                  }`}
                >
                  ${balanceRemaining.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Payment Status:</span>
                <Badge status={order.paymentStatus} size="sm">
                  {order.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="p-4 rounded-xl bg-dark-800/40 border border-white/5">
            <h5 className="text-xs font-bold text-slate-300 mb-1">
              Production Notes:
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              {order.notes}
            </p>
          </div>
        )}

        {/* Timeline */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Workflow History</span>
          </h4>

          <div className="space-y-3 pl-2 border-l border-white/10">
            {order.timeline.map((event, idx) => (
              <div key={idx} className="relative pl-5 text-xs">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-cyan-400" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-white">
                    {event.status}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {event.timestamp} • {event.actor}
                  </span>
                </div>
                <p className="text-slate-400 mt-0.5">{event.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Close button */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </Modal>
  );
}
