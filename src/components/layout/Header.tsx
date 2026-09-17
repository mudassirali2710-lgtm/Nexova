"use client";

import React, { useState } from "react";
import { useNexova } from "@/context/NexovaContext";
import { ReportingPeriod } from "@/types";
import { Calendar, Plus, Menu, Search, X } from "lucide-react";
import { AddOrderModal } from "@/components/orders/AddOrderModal";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export function Header() {
  const {
    reportingPeriod,
    setReportingPeriod,
    setMobileMenuOpen,
  } = useNexova();

  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const router = useRouter();

  const periodOptions: { id: ReportingPeriod; label: string }[] = [
    { id: "this-month", label: "This Month" },
    { id: "this-quarter", label: "This Quarter" },
    { id: "year-to-date", label: "Year to Date" },
    { id: "custom", label: "Custom Period" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      router.push(`/orders?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 h-20 bg-dark-900/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Global Quick Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center relative max-w-xs lg:max-w-md w-full"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search order ID (e.g. NX-1048), client, or design..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full bg-dark-800/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
          {quickSearch && (
            <button
              type="button"
              onClick={() => setQuickSearch("")}
              className="absolute right-3 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Right Controls: Period Selector & Quick Add Order */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Reporting Period Selector */}
          <div className="flex items-center bg-dark-800/90 border border-white/10 rounded-xl p-1 shadow-innerGlow">
            <div className="hidden sm:flex items-center gap-1.5 pl-2.5 pr-1 text-slate-400 text-xs">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="flex items-center gap-1">
              {periodOptions.map((opt) => {
                const isActive = reportingPeriod === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setReportingPeriod(opt.id)}
                    className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHeaderPeriod"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Add Order Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsAddOrderOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Order</span>
          </motion.button>
        </div>
      </header>

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isAddOrderOpen}
        onClose={() => setIsAddOrderOpen(false)}
      />
    </>
  );
}
