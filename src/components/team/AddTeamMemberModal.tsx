"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useNexova } from "@/context/NexovaContext";
import { DepartmentType } from "@/types";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTeamMemberModal({ isOpen, onClose }: AddTeamMemberModalProps) {
  const { addEmployee } = useNexova();

  const departments: DepartmentType[] = [
    "Management",
    "Sales & Calls",
    "Email / Outreach",
    "Promotion / Marketing",
    "Deal Closing",
    "Digitizing / Production",
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] =
    useState<DepartmentType>("Digitizing / Production");
  const [role, setRole] = useState("Digitizer");
  const [joiningDate, setJoiningDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [monthlyTarget, setMonthlyTarget] = useState(8000);
  const [status, setStatus] = useState<"Active" | "On Leave">("Active");

  // Role suggestions depending on department
  const roleSuggestions: Record<DepartmentType, string[]> = {
    Management: ["Operations Director", "Quality Assurance Lead", "Studio Manager"],
    "Sales & Calls": ["Account Executive", "Inbound Sales Rep", "Embroidery Quote Specialist"],
    "Email / Outreach": ["B2B Outreach Rep", "Wholesale Coordinator", "Client Re-engagement Tech"],
    "Promotion / Marketing": ["Portfolio Specialist", "Campaign Coordinator", "Brand Advocate"],
    "Deal Closing": ["High-Volume Contract Closer", "Uniform Fleet Negotiator"],
    "Digitizing / Production": [
      "Wilcom Master Digitizer",
      "3D Puff Specialist",
      "Vector & Small Text Artist",
      "Tajima Proofing Machine Operator",
      "Embroidery QC Inspector",
    ],
  };

  const handleDepartmentChange = (dept: DepartmentType) => {
    setDepartment(dept);
    const defRole = roleSuggestions[dept]?.[0] || "Team Member";
    setRole(defRole);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addEmployee({
      name,
      email,
      phone: phone || "+1 (555) 789-0123",
      department,
      role: role || "Specialist",
      joiningDate: joiningDate || new Date().toISOString().split("T")[0],
      monthlyTarget: Number(monthlyTarget) || 5000,
      status,
    });

    onClose();
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
      subtitle="Onboard a new specialist or operational team member"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Kenji Sato"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="name@nexovadigitizing.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Department *
            </label>
            <select
              value={department}
              onChange={(e) =>
                handleDepartmentChange(e.target.value as DepartmentType)
              }
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Role / Title *
            </label>
            <input
              type="text"
              required
              placeholder="Role name"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              list="role-suggestions"
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <datalist id="role-suggestions">
              {(roleSuggestions[department] || []).map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Monthly Target ($/Stitches)
            </label>
            <input
              type="number"
              value={monthlyTarget}
              onChange={(e) => setMonthlyTarget(Number(e.target.value))}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Active" | "On Leave")
              }
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
          >
            Add Member
          </button>
        </div>
      </form>
    </Modal>
  );
}
