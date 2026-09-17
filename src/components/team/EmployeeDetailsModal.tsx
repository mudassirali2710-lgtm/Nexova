"use client";

import React from "react";
import { Modal } from "@/components/ui/Modal";
import { Employee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { useNexova } from "@/context/NexovaContext";
import {
  Mail,
  Phone,
  CheckCircle,
  Package,
} from "lucide-react";

interface EmployeeDetailsModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EmployeeDetailsModal({
  employee,
  isOpen,
  onClose,
}: EmployeeDetailsModalProps) {
  const { orders } = useNexova();

  if (!employee) return null;

  const assignedOrders = orders.filter(
    (o) =>
      o.assignedEmployee.toLowerCase() === employee.name.toLowerCase() ||
      o.assignedDepartment === employee.department
  );

  const isDigitizing = employee.department === "Digitizing / Production";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={employee.name}
      subtitle={`${employee.role} • ${employee.department}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Top Header Card */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-800 border border-white/10">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${
              employee.avatarBg || "from-blue-600 to-cyan-500"
            } flex items-center justify-center text-lg font-bold text-white shadow-md`}
          >
            {employee.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-white">{employee.name}</h3>
              <Badge status={employee.status} size="sm">
                {employee.status}
              </Badge>
            </div>
            <div className="text-xs text-cyan-400 font-medium mt-0.5">
              {employee.role}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-4">
              <span>ID: {employee.id}</span>
              <span>Joined: {employee.joiningDate}</span>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards tailored to role */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-800/80 border border-white/5">
            <div className="text-xs text-slate-400">Handled Orders</div>
            <div className="text-2xl font-mono font-bold text-white mt-1">
              {employee.ordersHandled}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>{employee.completedOrders} completed</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-800/80 border border-white/5">
            <div className="text-xs text-slate-400">
              {isDigitizing ? "Digitizing Output" : "Revenue Booked"}
            </div>
            <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
              {isDigitizing
                ? employee.stitchOutput || `${employee.completedOrders} files`
                : `$${(employee.revenueOrSales || 0).toLocaleString()}`}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              {isDigitizing
                ? `${employee.currentWorkload} active in queue`
                : `Target: $${(employee.monthlyTarget || 0).toLocaleString()}`}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-dark-800/80 border border-white/5">
            <div className="text-xs text-slate-400">
              {isDigitizing ? "SLA Completion Rate" : "Target Achievement"}
            </div>
            <div className="text-2xl font-mono font-bold text-white mt-1">
              {employee.completionRate}%
            </div>
            <div className="w-full h-1.5 rounded-full bg-dark-700 mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${Math.min(employee.completionRate, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-slate-500" />
            <a href={`mailto:${employee.email}`} className="hover:text-cyan-400">
              {employee.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="w-4 h-4 text-slate-500" />
            <span>{employee.phone}</span>
          </div>
        </div>

        {/* Active Handled Orders Sample */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Assigned Production Workload ({assignedOrders.length})</span>
          </h4>

          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
            {assignedOrders.slice(0, 6).map((ord) => (
              <div
                key={ord.id}
                className="p-3 rounded-xl bg-dark-800/60 border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-white mr-2">
                    {ord.id}
                  </span>
                  <span className="text-slate-300">{ord.designName}</span>
                  <div className="text-[11px] text-slate-400">
                    {ord.company} • {ord.placement}
                  </div>
                </div>
                <Badge status={ord.status} size="sm">
                  {ord.status}
                </Badge>
              </div>
            ))}
          </div>
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
