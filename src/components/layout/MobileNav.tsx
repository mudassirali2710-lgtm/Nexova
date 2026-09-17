"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNexova } from "@/context/NexovaContext";
import { NexovaLogo } from "@/components/ui/NexovaLogo";
import {
  LayoutDashboard,
  Layers,
  Users,
  Briefcase,
  LineChart,
  Settings,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

export function MobileNav() {
  const pathname = usePathname();
  const { mobileMenuOpen, setMobileMenuOpen } = useNexova();

  const navItems = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: Layers },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Team", href: "/team", icon: Briefcase },
    { name: "Performance", href: "/performance", icon: LineChart },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="fixed inset-y-0 left-0 w-72 bg-dark-900 border-r border-white/10 p-5 flex flex-col justify-between shadow-2xl z-10"
          >
            <div>
              {/* Top Logo & Close */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <NexovaLogo size="sm" showWordmark={true} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/"
                      ? pathname === "/" || pathname === "/overview"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/25 via-cyan-500/20 to-transparent text-white border-l-2 border-cyan-400 font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-cyan-400" : "text-slate-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Manager Profile Footer */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 border border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  MV
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Marcus Vance</div>
                  <div className="text-[10px] text-cyan-400 uppercase font-mono">
                    Managing Director
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
