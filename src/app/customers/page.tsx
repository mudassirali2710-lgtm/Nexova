"use client";

import React, { useState, useMemo } from "react";
import { useNexova } from "@/context/NexovaContext";
import { Customer, Order } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { AddCustomerModal } from "@/components/customers/AddCustomerModal";
import { CustomerDetailsModal } from "@/components/customers/CustomerDetailsModal";
import { OrderDetailsModal } from "@/components/orders/OrderDetailsModal";
import {
  Search,
  Plus,
  Building,
  Eye,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "@/components/motion/MotionPrimitives";

export default function CustomersPage() {
  const { customers } = useNexova();

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"spent-desc" | "orders-desc" | "balance-desc" | "name-asc">("spent-desc");

  const statuses = ["All", "VIP", "Active", "New", "Inactive"];

  const filteredAndSortedCustomers = useMemo(() => {
    return customers
      .filter((cust) => {
        const matchesSearch =
          cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.city.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || cust.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "spent-desc") return b.totalSpent - a.totalSpent;
        if (sortBy === "balance-desc") return b.outstandingBalance - a.outstandingBalance;
        if (sortBy === "orders-desc") return b.totalOrders - a.totalOrders;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [customers, searchTerm, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn delay={0.02} distance={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Customer Accounts
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-dark-800 border border-white/10 text-cyan-300 font-mono text-xs font-semibold">
                {filteredAndSortedCustomers.length} accounts
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Directory of apparel companies, corporate uniform contractors, and commercial clients.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </motion.button>
        </div>
      </FadeIn>

      {/* Filter & Search Bar */}
      <FadeIn delay={0.06} distance={8}>
        <div className="p-4 rounded-2xl bg-dark-850 border border-white/10 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search customer name, company, email..."
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

        {/* Tier & Sort Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === st
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-dark-800 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="spent-desc">Sort: Highest Total Spent</option>
            <option value="balance-desc">Sort: Highest Outstanding Balance</option>
            <option value="orders-desc">Sort: Most Orders</option>
            <option value="name-asc">Sort: Name (A-Z)</option>
          </select>
        </div>
      </div>
      </FadeIn>

      {/* Customers Table */}
      <FadeIn delay={0.1} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Company / Brand</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4 text-center">Total Orders</th>
                <th className="py-3.5 px-4 text-right">Total Spent</th>
                <th className="py-3.5 px-4 text-right">Outstanding Balance</th>
                <th className="py-3.5 px-4">Latest Order</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAndSortedCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-dark-800/80 transition-colors group cursor-pointer"
                >
                  {/* Customer name */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {cust.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {cust.id}
                    </div>
                  </td>

                  {/* Company */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-200 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cust.company}</span>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="py-3.5 px-4 text-[11px]">
                    <div className="text-slate-300 truncate max-w-[180px]">
                      {cust.email}
                    </div>
                    <div className="text-slate-500 font-mono">
                      {cust.phone}
                    </div>
                  </td>

                  {/* Total Orders */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono font-bold text-slate-200">
                      {cust.totalOrders}
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ${cust.totalSpent.toLocaleString()}
                  </td>

                  {/* Outstanding Balance */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold">
                    <span
                      className={
                        cust.outstandingBalance > 0
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }
                    >
                      ${cust.outstandingBalance.toLocaleString()}
                    </span>
                  </td>

                  {/* Latest Order */}
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                    {cust.latestOrderId ? (
                      <div>
                        <span className="text-cyan-400 font-bold">
                          {cust.latestOrderId}
                        </span>
                        <div className="text-[10px] text-slate-500">
                          {cust.latestOrderDate}
                        </div>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    <Badge status={cust.status} size="sm">
                      {cust.status}
                    </Badge>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCustomer(cust);
                      }}
                      className="p-1.5 rounded-lg bg-dark-800 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                      title="View Customer Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedCustomers.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-xs">
            No customers found matching your search.
          </div>
        )}
      </div>
      </FadeIn>

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onSelectOrder={(ord) => setInspectedOrder(ord)}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={inspectedOrder}
        isOpen={!!inspectedOrder}
        onClose={() => setInspectedOrder(null)}
      />
    </div>
  );
}
