"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useNexova } from "@/context/NexovaContext";
import {
  EmbroideryPlacement,
  DepartmentType,
  OrderStatus,
} from "@/types";

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddOrderModal({ isOpen, onClose }: AddOrderModalProps) {
  const { addOrder, customers, employees } = useNexova();

  const placements: EmbroideryPlacement[] = [
    "Cap Logo",
    "Left Chest Logo",
    "Front Chest Logo",
    "Jacket Back",
    "Sleeve Logo",
    "Bag Logo",
    "Hat Logo",
    "Uniform Logo",
  ];

  const departments: DepartmentType[] = [
    "Management",
    "Sales & Calls",
    "Email / Outreach",
    "Promotion / Marketing",
    "Deal Closing",
    "Digitizing / Production",
  ];

  const statuses: OrderStatus[] = [
    "New",
    "In Review",
    "Digitizing",
    "Production / Ready",
    "Completed",
    "Cancelled",
  ];

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [designName, setDesignName] = useState("");
  const [placement, setPlacement] = useState<EmbroideryPlacement>("Cap Logo");
  const [assignedDepartment, setAssignedDepartment] =
    useState<DepartmentType>("Digitizing / Production");
  const [assignedEmployee, setAssignedEmployee] = useState(
    employees.find((e) => e.department === "Digitizing / Production")?.name ||
      "Kenji Sato"
  );
  const [upfrontAmount, setUpfrontAmount] = useState(80);
  const [totalAmount, setTotalAmount] = useState(220);
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<OrderStatus>("New");
  const [notes, setNotes] = useState("");
  const [stitchCount, setStitchCount] = useState(8400);
  const [fileFormat, setFileFormat] = useState("DST");

  // Auto-fill company/phone/email if customer selected from existing
  const handleCustomerSelect = (name: string) => {
    setCustomerName(name);
    const existing = customers.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      setCompany(existing.company);
      setPhone(existing.phone);
      setEmail(existing.email);
    }
  };

  const handleDepartmentChange = (dept: DepartmentType) => {
    setAssignedDepartment(dept);
    const deptEmployees = employees.filter((e) => e.department === dept);
    if (deptEmployees.length > 0) {
      setAssignedEmployee(deptEmployees[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !company || !designName) {
      return;
    }

    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    addOrder({
      customerId: "CUST-CUSTOM",
      customerName,
      company,
      phone: phone || "+1 (555) 000-0000",
      email: email || `${customerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      designName,
      placement,
      stitchCount: Number(stitchCount) || 8500,
      threadColors: 4,
      fileFormat,
      assignedDepartment,
      assignedEmployee,
      upfrontAmount: Number(upfrontAmount) || 0,
      totalAmount: Number(totalAmount) || 0,
      orderDate: orderDate || new Date().toISOString().split("T")[0],
      dueDate,
      status,
      notes: notes || "Embroidery digitizing order registered via portal.",
    });

    onClose();
  };

  const calculatedRemaining = Math.max(0, totalAmount - upfrontAmount);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Embroidery Order"
      subtitle="Register a new custom digitizing or production order"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Marcus Holloway"
              value={customerName}
              onChange={(e) => handleCustomerSelect(e.target.value)}
              list="existing-customers"
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <datalist id="existing-customers">
              {customers.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.company}
                </option>
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Company / Brand *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Urban Stitch Co."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Contact Info: Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 012-3456"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="client@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Design Name & Placement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Design Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cap Logo 3D Puff"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Embroidery Placement
            </label>
            <select
              value={placement}
              onChange={(e) =>
                setPlacement(e.target.value as EmbroideryPlacement)
              }
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {placements.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assigned Department & Employee */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Assigned Department
            </label>
            <select
              value={assignedDepartment}
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
              Assigned Specialist
            </label>
            <select
              value={assignedEmployee}
              onChange={(e) => setAssignedEmployee(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            >
              {employees
                .filter((e) => e.department === assignedDepartment)
                .map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name} ({e.role})
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Financials: Upfront, Remaining, Total */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Upfront Deposit ($)
            </label>
            <input
              type="number"
              min="0"
              value={upfrontAmount}
              onChange={(e) => setUpfrontAmount(Number(e.target.value))}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Total Order Amount ($)
            </label>
            <input
              type="number"
              min="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(Number(e.target.value))}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Remaining Balance ($)
            </label>
            <div className="w-full bg-dark-850 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-amber-400 font-mono font-bold">
              ${calculatedRemaining}
            </div>
          </div>
        </div>

        {/* Date, Status, Stitches, Format */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Order Date
            </label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Estimated Stitches
            </label>
            <input
              type="number"
              value={stitchCount}
              onChange={(e) => setStitchCount(Number(e.target.value))}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Machine Format
            </label>
            <select
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors font-mono"
            >
              <option value="DST">DST (Tajima)</option>
              <option value="EMB">EMB (Wilcom Master)</option>
              <option value="PES">PES (Brother/BabyLock)</option>
              <option value="EXP">EXP (Melco/Bernina)</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Production & Digitizing Notes
          </label>
          <textarea
            rows={2}
            placeholder="Material type (e.g. pique polo, trucker cap), 3D puff backing, needle sizing..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-dark-800 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
          >
            Create Order
          </button>
        </div>
      </form>
    </Modal>
  );
}
