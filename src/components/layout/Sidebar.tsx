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
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { smoothEase } from "@/components/motion/MotionPrimitives";

export function Sidebar() {
  const pathname = usePathname();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    unreadCount,
    notifications,
    markAllNotificationsRead,
  } = useNexova();

  const [showNotifications, setShowNotifications] = React.useState(false);

  const navItems = [
    {
      name: "Overview",
      href: "/",
      icon: LayoutDashboard,
      active: pathname === "/" || pathname === "/overview",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: Layers,
      active: pathname.startsWith("/orders"),
    },
    {
      name: "Customers",
      href: "/customers",
      icon: Users,
      active: pathname.startsWith("/customers"),
    },
    {
      name: "Team",
      href: "/team",
      icon: Briefcase,
      active: pathname.startsWith("/team"),
    },
    {
      name: "Performance",
      href: "/performance",
      icon: LineChart,
      active: pathname.startsWith("/performance"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname.startsWith("/settings"),
    },
  ];

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col justify-between h-screen sticky top-0 bg-dark-900 border-r border-white/10 transition-all duration-300 z-30 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top: Logo & Brand */}
        <div>
          <div
            className={`h-20 flex items-center border-b border-white/10 px-5 ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <Link href="/" className="flex items-center">
              <NexovaLogo
                size={sidebarCollapsed ? "sm" : "md"}
                showWordmark={!sidebarCollapsed}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 mt-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block relative"
                >
                  <motion.div
                    whileHover={sidebarCollapsed ? undefined : { x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15, ease: smoothEase }}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium transition-colors group relative ${
                      item.active
                        ? "bg-gradient-to-r from-blue-600/20 via-cyan-500/15 to-transparent text-white border-l-2 border-cyan-400 font-semibold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-transform group-hover:scale-110 shrink-0 ${
                        item.active
                          ? "text-cyan-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}

                    {/* Tooltip on collapse */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1 bg-dark-800 border border-white/10 text-white text-xs rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                        {item.name}
                      </div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Notifications + Manager Profile + Collapse Button */}
        <div className="p-3 border-t border-white/10 space-y-2 bg-dark-950/40">
          {/* Notifications Trigger Button */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${
                sidebarCollapsed ? "justify-center px-0" : ""
              }`}
            >
              <div className="relative">
                <Bell className="w-4 h-4 text-slate-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              {!sidebarCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold border border-cyan-500/30">
                      {unreadCount}
                    </span>
                  )}
                </div>
              )}
            </motion.button>

            {/* Notification Popover */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.2, ease: smoothEase }}
                  className={`absolute bottom-full mb-2 bg-dark-850 border border-white/15 rounded-2xl shadow-2xl p-4 z-50 ${
                    sidebarCollapsed ? "left-full ml-3 w-80" : "left-0 right-0 w-80"
                  }`}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Live Feed
                      </h4>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Read all</span>
                    </button>
                  </div>

                  <div className="space-y-2.5 max-h-64 overflow-y-auto custom-scrollbar">
                    {notifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          n.isRead
                            ? "bg-dark-800/40 border-white/5 text-slate-400"
                            : "bg-cyan-950/30 border-cyan-500/30 text-slate-200"
                        }`}
                      >
                        <div className="font-semibold text-white flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Manager Profile Pill */}
          <div
            className={`flex items-center gap-3 p-2.5 rounded-xl bg-dark-800/80 border border-white/5 ${
              sidebarCollapsed ? "justify-center p-2" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
              MV
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  Marcus Vance
                </div>
                <div className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">
                  Managing Director
                </div>
              </div>
            )}
          </div>

          {/* Collapse Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-xs"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[11px] font-medium">Collapse Menu</span>
              </div>
            )}
          </motion.button>
        </div>
      </aside>
    </>
  );
}
