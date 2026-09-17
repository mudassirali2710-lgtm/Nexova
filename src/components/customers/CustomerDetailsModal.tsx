"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Customer, Order } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useNexova } from "@/context/NexovaContext";
import {
  Building,
  Mail,
  Phone,
  Calendar,
  Package,
} from "lucide-react";

interface CustomerDetailsModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder?: (order: Order) => void;
}

export function CustomerDetailsModal({
  customer,
  isOpen,
  onClose,
  onSelectOrder,
}: CustomerDetailsModalProps) {
  const { orders } = useNexova();

  if (!customer) return null;

  const customerOrders = orders.filter(
    (o) =>
      o.customerId === customer.id ||
      o.customerName.toLowerCase() === customer.name.toLowerCase() ||
      o.company.toLowerCase() === customer.company.toLowerCase()
  );

  const totalSpentCalculated =
    customerOrders.length > 0
      ? customerOrders.reduce((sum, o) => sum + o.totalAmount, 0)
      : customer.totalSpent;

  const totalOutstandingCalculated =
    customerOrders.length > 0
      ? customerOrders.reduce((sum, o) => sum + o.remainingBalance, 0)
      : customer.outstandingBalance;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={customer.company}
      subtitle={`Account ID: ${customer.id} • ${customer.name}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Profile Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-800 border border-white/5">
            <div className="text-xs text-slate-400">Total Billed</div>
            <div className="text-xl font-mono font-bold text-white mt-1">
              ${totalSpentCalculated.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">
              Lifetime spend
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-800 border border-white/5">
            <div className="text-xs text-slate-400">Outstanding Balance</div>
            <div
              className={`text-xl font-mono font-bold mt-1 ${
                totalOutstandingCalculated > 0
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              ${totalOutstandingCalculated.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Pending collection
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-800 border border-white/5">
            <div className="text-xs text-slate-400">Total Orders</div>
            <div className="text-xl font-mono font-bold text-cyan-400 mt-1">
              {customerOrders.length || customer.totalOrders}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Embroidery projects
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-slate-500" />
            <a href={`mailto:${customer.email}`} className="hover:text-cyan-400">
              {customer.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Building className="w-4 h-4 text-slate-500" />
            <span>{customer.city}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Client Since: {customer.registrationDate}</span>
          </div>
        </div>

        {/* Customer Notes */}
        {customer.notes && (
          <div className="p-3.5 rounded-xl bg-dark-800/40 border border-white/5 text-xs text-slate-300">
            <div className="font-semibold text-slate-200 mb-1">
              Brand Digitizing Specifications:
            </div>
            {customer.notes}
          </div>
        )}

        {/* Order History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Order History ({customerOrders.length})</span>
            </h4>
          </div>

          {customerOrders.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs rounded-xl bg-dark-800/30 border border-dashed border-white/10">
              No orders placed yet.
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
              {customerOrders.map((ord) => (
                <div
                  key={ord.id}
                  onClick={() => onSelectOrder && onSelectOrder(ord)}
                  className={`p-3 rounded-xl bg-dark-800/80 border border-white/5 flex items-center justify-between gap-3 text-xs ${
                    onSelectOrder
                      ? "cursor-pointer hover:border-cyan-500/40 hover:bg-dark-800 transition-colors"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">
                        {ord.id}
                      </span>
                      <span className="text-slate-300 font-medium">
                        {ord.designName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {ord.placement} • {ord.orderDate}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right font-mono">
                      <div className="font-bold text-slate-200">
                        ${ord.totalAmount}
                      </div>
                      <div className="text-[10px] text-amber-400">
                        ${ord.remainingBalance} due
                      </div>
                    </div>
                    <Badge status={ord.status} size="sm">
                      {ord.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-white text-xs font-semibold border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
