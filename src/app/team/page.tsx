"use client";

import React, { useState, useMemo } from "react";
import { useNexova } from "@/context/NexovaContext";
import { Employee } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { AddTeamMemberModal } from "@/components/team/AddTeamMemberModal";
import { EmployeeDetailsModal } from "@/components/team/EmployeeDetailsModal";
import {
  Plus,
  Briefcase,
  Search,
  CheckCircle,
  Eye,
} from "lucide-react";
import { motion } from "motion/react";
import { FadeIn, smoothEase } from "@/components/motion/MotionPrimitives";

export default function TeamPage() {
  const { employees, departments } = useNexova();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const deptList = [
    "All",
    "Digitizing / Production",
    "Sales & Calls",
    "Email / Outreach",
    "Promotion / Marketing",
    "Deal Closing",
    "Management",
  ];

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept =
        selectedDepartment === "All" || emp.department === selectedDepartment;

      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, selectedDepartment]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0.02} distance={8}>
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Team & Operations
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-dark-800 border border-white/10 text-cyan-300 font-mono text-xs font-semibold">
                {employees.length} specialists
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Studio structure, digitizing craft specialists, client outreach, and capacity management.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </motion.button>
        </div>
      </FadeIn>

      {/* Department Workload Cards */}
      <FadeIn delay={0.08} distance={10}>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Department Workloads & Targets</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => {
              const isDigitizing = dept.name === "Digitizing / Production";

              return (
                <motion.div
                  key={dept.name}
                  onClick={() => setSelectedDepartment(dept.name)}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: smoothEase }}
                  className={`p-5 rounded-2xl bg-dark-850 border transition-colors duration-200 cursor-pointer ${
                    selectedDepartment === dept.name
                      ? "border-cyan-500/60 shadow-glow bg-dark-800"
                      : "border-white/10 hover:border-white/20 hover:bg-dark-800/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">
                      {dept.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold">
                      {dept.memberCount} members
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 min-h-[32px]">
                    {dept.description}
                  </p>

                  {/* Workload Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Current Workload:</span>
                      <span
                        className={`font-mono font-bold ${
                          dept.workloadPercent > 90
                            ? "text-amber-400"
                            : "text-cyan-400"
                        }`}
                      >
                        {dept.workloadPercent}% capacity
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-dark-700 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${dept.workloadPercent}%` }}
                        transition={{ duration: 0.6, ease: smoothEase }}
                        className={`h-full rounded-full ${
                          dept.workloadPercent > 90
                            ? "bg-gradient-to-r from-amber-500 to-rose-500"
                            : "bg-gradient-to-r from-blue-500 to-cyan-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 text-[11px]">
                      {isDigitizing ? "Output Volume:" : "Metric:"}
                    </span>
                    <span className="text-slate-200 font-semibold">
                      {dept.outputMetric}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </FadeIn>

      {/* Employees Table Section */}
      <FadeIn delay={0.14} distance={10}>
        <div className="bg-dark-850 border border-white/10 rounded-2xl shadow-card overflow-hidden">
        {/* Table Filters Header */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-dark-900/40">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search employee by name, title, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {deptList.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDepartment(d)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedDepartment === d
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {d === "Digitizing / Production" ? "Digitizing" : d}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[950px]">
            <thead>
              <tr className="border-b border-white/10 bg-dark-900/60 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Role & Title</th>
                <th className="py-3.5 px-4 text-center">Handled</th>
                <th className="py-3.5 px-4 text-center">Completed</th>
                <th className="py-3.5 px-4 text-center">Active Queue</th>
                <th className="py-3.5 px-4 text-right">Production / Sales</th>
                <th className="py-3.5 px-4 text-right">SLA / Target</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEmployees.map((emp) => {
                const isDigitizing = emp.department === "Digitizing / Production";

                return (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    className="hover:bg-dark-800/80 transition-colors group cursor-pointer"
                  >
                    {/* Employee */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full bg-gradient-to-tr ${
                            emp.avatarBg || "from-blue-600 to-cyan-500"
                          } flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0`}
                        >
                          {emp.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {emp.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" size="sm">
                        {emp.department}
                      </Badge>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 text-slate-300 font-medium">
                      {emp.role}
                    </td>

                    {/* Orders Handled */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-200">
                      {emp.ordersHandled}
                    </td>

                    {/* Completed */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-semibold text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        {emp.completedOrders}
                      </span>
                    </td>

                    {/* Active Queue */}
                    <td className="py-3.5 px-4 text-center font-mono text-cyan-400 font-semibold">
                      {emp.currentWorkload} jobs
                    </td>

                    {/* Production / Sales */}
                    <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-100">
                      {isDigitizing
                        ? emp.stitchOutput || `${emp.ordersHandled} files`
                        : `$${(emp.revenueOrSales || 0).toLocaleString()}`}
                    </td>

                    {/* SLA / Target Performance */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className={`font-mono font-bold text-xs ${
                            emp.completionRate >= 95
                              ? "text-emerald-400"
                              : "text-cyan-400"
                          }`}
                        >
                          {emp.completionRate}%
                        </span>
                        <div className="w-16 h-1.5 rounded-full bg-dark-700 overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${
                              emp.completionRate >= 95
                                ? "bg-gradient-to-r from-teal-500 to-emerald-400"
                                : "bg-gradient-to-r from-blue-500 to-cyan-400"
                            }`}
                            style={{
                              width: `${Math.min(emp.completionRate, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      <Badge status={emp.status} size="sm">
                        {emp.status}
                      </Badge>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </FadeIn>

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Employee Details Modal */}
      <EmployeeDetailsModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
}
