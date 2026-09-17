"use client";

import React, { useState } from "react";
import { useNexova } from "@/context/NexovaContext";
import { AddTeamMemberModal } from "@/components/team/AddTeamMemberModal";
import {
  Building2,
  Users,
  Sliders,
  User,
  Save,
  Plus,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, smoothEase } from "@/components/motion/MotionPrimitives";

export default function SettingsPage() {
  const { showToast, reportingPeriod, setReportingPeriod } = useNexova();

  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);

  // Business Profile Form State
  const [businessName, setBusinessName] = useState("Nexova Digitizing Studio");
  const [businessEmail, setBusinessEmail] = useState("ops@nexovadigitizing.com");
  const [businessPhone, setBusinessPhone] = useState("+1 (800) 555-NEXO");
  const [businessAddress, setBusinessAddress] = useState(
    "742 Precision Loop, Suite 400, Austin, TX 78701"
  );
  const [turnaroundDefault, setTurnaroundDefault] = useState("24-48 Hours");

  // Manager Profile Form State
  const [managerName, setManagerName] = useState("Marcus Vance");
  const [managerEmail, setManagerEmail] = useState("m.vance@nexovadigitizing.com");
  const [managerRole, setManagerRole] = useState("Managing Director & Co-Founder");

  // Preferences
  const [currency, setCurrency] = useState("USD ($)");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [orderProofAlerts, setOrderProofAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings Saved", "Business profile and operations settings updated.");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <FadeIn delay={0.02} distance={8}>
        <div className="pb-3 border-b border-white/5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure business profile, operational preferences, and manager credentials.
          </p>
        </div>
      </FadeIn>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Section 1: Business Profile */}
        <FadeIn delay={0.06} distance={10}>
          <div className="p-6 rounded-2xl bg-dark-850 border border-white/10 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Business Profile</h3>
                <p className="text-xs text-slate-400">
                  Studio contact information and business address
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company Brand Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Business Email
                </label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Business Phone
                </label>
                <input
                  type="text"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Standard Turnaround
                </label>
                <input
                  type="text"
                  value={turnaroundDefault}
                  onChange={(e) => setTurnaroundDefault(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Physical Studio Address
                </label>
                <input
                  type="text"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Section 2: Operational Preferences */}
        <FadeIn delay={0.1} distance={10}>
          <div className="p-6 rounded-2xl bg-dark-850 border border-white/10 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Operational Preferences
                </h3>
                <p className="text-xs text-slate-400">
                  Default currency, notifications, and workflow defaults
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Billing Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="CAD ($)">CAD ($) - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Default Reporting Window
                </label>
                <select
                  value={reportingPeriod}
                  onChange={(e) => setReportingPeriod(e.target.value as any)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                >
                  <option value="this-month">This Month</option>
                  <option value="this-quarter">This Quarter</option>
                  <option value="year-to-date">Year to Date</option>
                </select>
              </div>
            </div>

            {/* Checkbox toggles */}
            <div className="pt-3 border-t border-white/5 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded bg-dark-800 border-white/10 text-cyan-500 focus:ring-cyan-500/20"
                />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Send Immediate Dispatch Alert Emails
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Automatically trigger stitch proof approval emails to clients
                  </div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={orderProofAlerts}
                  onChange={(e) => setOrderProofAlerts(e.target.checked)}
                  className="w-4 h-4 rounded bg-dark-800 border-white/10 text-cyan-500 focus:ring-cyan-500/20"
                />
                <div>
                  <div className="text-xs font-semibold text-white">
                    Internal Digitizing Capacity Alerts
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Notify senior digitizers when queue reaches 90% threshold
                  </div>
                </div>
              </label>
            </div>
          </div>
        </FadeIn>

        {/* Section 3: Manager Credentials */}
        <FadeIn delay={0.14} distance={10}>
          <div className="p-6 rounded-2xl bg-dark-850 border border-white/10 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Manager Profile</h3>
                <p className="text-xs text-slate-400">
                  Account credentials and manager role
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Manager Name
                </label>
                <input
                  type="text"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={managerRole}
                  onChange={(e) => setManagerRole(e.target.value)}
                  className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Save Button */}
        <FadeIn delay={0.18} distance={10}>
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </motion.button>
          </div>
        </FadeIn>
      </form>

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={isAddTeamModalOpen}
        onClose={() => setIsAddTeamModalOpen(false)}
      />
    </div>
  );
}
