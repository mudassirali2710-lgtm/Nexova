"use client";

import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";
import {
  Order,
  Customer,
  Employee,
  DepartmentInfo,
  NotificationItem,
  ReportingPeriod,
  OrderStatus,
  PaymentStatus,
} from "@/types";
import { initialOrders } from "@/data/orders";
import { initialCustomers } from "@/data/customers";
import { initialEmployees } from "@/data/employees";
import { initialDepartments } from "@/data/departments";
import { initialNotifications } from "@/data/notifications";
import { periodMetrics, PeriodSummary } from "@/data/performance";

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "info" | "error";
}

interface NexovaContextType {
  orders: Order[];
  customers: Customer[];
  employees: Employee[];
  departments: DepartmentInfo[];
  notifications: NotificationItem[];
  unreadCount: number;
  reportingPeriod: ReportingPeriod;
  setReportingPeriod: (period: ReportingPeriod) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Actions
  addOrder: (order: Omit<Order, "id" | "timeline" | "remainingBalance" | "paymentStatus">) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  addCustomer: (customer: Omit<Customer, "id" | "totalOrders" | "totalSpent" | "outstandingBalance" | "registrationDate">) => Customer;
  addEmployee: (employee: Omit<Employee, "id" | "ordersHandled" | "completedOrders" | "completionRate" | "currentWorkload">) => Employee;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Metrics
  metrics: PeriodSummary;
  toasts: ToastMessage[];
  dismissToast: (id: string) => void;
  showToast: (title: string, message: string, type?: "success" | "info" | "error") => void;
}

const NexovaContext = createContext<NexovaContextType | undefined>(undefined);

export function NexovaProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [departments, setDepartments] = useState<DepartmentInfo[]>(initialDepartments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [reportingPeriod, setReportingPeriod] = useState<ReportingPeriod>("this-month");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = (title: string, message: string, type: "success" | "info" | "error" = "success") => {
    const id = "toast-" + Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  // Dynamic Metrics combining base period statistics with user-created state
  const metrics = useMemo(() => {
    const base = { ...periodMetrics[reportingPeriod] };

    // Dynamically compute workflow counts from real orders in memory
    const counts = {
      new: orders.filter((o) => o.status === "New").length,
      inReview: orders.filter((o) => o.status === "In Review").length,
      digitizing: orders.filter((o) => o.status === "Digitizing").length,
      production: orders.filter((o) => o.status === "Production / Ready").length,
      completed: orders.filter((o) => o.status === "Completed").length,
      cancelled: orders.filter((o) => o.status === "Cancelled").length,
    };

    if (reportingPeriod === "this-month") {
      const addedOrdersCount = orders.length > initialOrders.length ? orders.length - initialOrders.length : 0;
      const addedRevenue = orders.length > initialOrders.length 
        ? orders.slice(0, addedOrdersCount).reduce((sum, o) => sum + o.totalAmount, 0)
        : 0;
      const addedUpfront = orders.length > initialOrders.length
        ? orders.slice(0, addedOrdersCount).reduce((sum, o) => sum + o.upfrontAmount, 0)
        : 0;
      const addedRemaining = orders.length > initialOrders.length
        ? orders.slice(0, addedOrdersCount).reduce((sum, o) => sum + o.remainingBalance, 0)
        : 0;

      return {
        ...base,
        revenue: 48620 + addedRevenue,
        orders: 186 + addedOrdersCount,
        upfrontPayments: 14850 + addedUpfront,
        outstandingBalance: 8420 + addedRemaining,
        completedOrders: Math.max(142, counts.completed),
        workflow: {
          new: Math.max(18, counts.new),
          inReview: Math.max(14, counts.inReview),
          digitizing: Math.max(21, counts.digitizing),
          production: Math.max(16, counts.production),
          completed: Math.max(142, counts.completed),
          cancelled: Math.max(5, counts.cancelled),
        },
      };
    }

    return {
      ...base,
      workflow: counts,
    };
  }, [reportingPeriod, orders]);

  // Add Order action
  const addOrder = (orderData: Omit<Order, "id" | "timeline" | "remainingBalance" | "paymentStatus">): Order => {
    const nextNum = orders.length + 1050;
    const newId = `NX-${nextNum}`;
    const remainingBalance = Math.max(0, orderData.totalAmount - orderData.upfrontAmount);
    const paymentStatus: PaymentStatus =
      remainingBalance === 0
        ? "Paid in Full"
        : orderData.upfrontAmount > 0
        ? "Partially Paid"
        : "Unpaid";

    const newOrder: Order = {
      ...orderData,
      id: newId,
      remainingBalance,
      paymentStatus,
      timeline: [
        {
          status: orderData.status,
          timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
          note: `Order ${newId} registered in ${orderData.status} state.`,
          actor: "Marcus Vance",
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update customer spend/orders/outstanding if existing
    setCustomers((prev) =>
      prev.map((c) => {
        if (
          c.name.toLowerCase() === orderData.customerName.toLowerCase() ||
          c.company.toLowerCase() === orderData.company.toLowerCase()
        ) {
          return {
            ...c,
            totalOrders: c.totalOrders + 1,
            totalSpent: c.totalSpent + orderData.totalAmount,
            outstandingBalance: c.outstandingBalance + remainingBalance,
            latestOrderId: newId,
            latestOrderDate: orderData.orderDate,
          };
        }
        return c;
      })
    );

    // Create Notification
    const notif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: `Order ${newId} Created`,
      message: `${orderData.company} (${orderData.designName}) placed for ${orderData.placement}.`,
      time: "Just now",
      type: "order",
      isRead: false,
      linkHref: `/orders?id=${newId}`,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Order Created", `Order ${newId} has been registered.`);
    return newOrder;
  };

  // Update Order Status action
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStatus,
            timeline: [
              {
                status: newStatus,
                timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
                note: note || `Status transitioned to ${newStatus}`,
                actor: "Marcus Vance",
              },
              ...o.timeline,
            ],
          };
        }
        return o;
      })
    );

    const notif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: `Order ${orderId} Updated`,
      message: `Status moved to "${newStatus}".`,
      time: "Just now",
      type: "order",
      isRead: false,
      linkHref: `/orders?id=${orderId}`,
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Status Updated", `${orderId} is now "${newStatus}"`);
  };

  // Add Customer action
  const addCustomer = (
    custData: Omit<Customer, "id" | "totalOrders" | "totalSpent" | "outstandingBalance" | "registrationDate">
  ): Customer => {
    const newId = `CUST-${customers.length + 101}`;
    const newCust: Customer = {
      ...custData,
      id: newId,
      registrationDate: new Date().toISOString().split("T")[0],
      totalOrders: 0,
      totalSpent: 0,
      outstandingBalance: 0,
      status: custData.status || "New",
    };

    setCustomers((prev) => [newCust, ...prev]);

    const notif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: "New Customer Registered",
      message: `${newCust.name} (${newCust.company}) was added to Nexova accounts.`,
      time: "Just now",
      type: "customer",
      isRead: false,
      linkHref: "/customers",
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Customer Added", `${newCust.company} registered.`);
    return newCust;
  };

  // Add Employee action
  const addEmployee = (
    empData: Omit<Employee, "id" | "ordersHandled" | "completedOrders" | "completionRate" | "currentWorkload">
  ): Employee => {
    const newId = `EMP-${String(employees.length + 1).padStart(2, "0")}`;
    const newEmp: Employee = {
      ...empData,
      id: newId,
      ordersHandled: 0,
      completedOrders: 0,
      completionRate: 100,
      currentWorkload: 0,
      status: empData.status || "Active",
      avatarBg: "from-blue-600 to-teal-600",
    };

    setEmployees((prev) => [...prev, newEmp]);

    // Update department member count
    setDepartments((prev) =>
      prev.map((d) =>
        d.name === empData.department
          ? { ...d, memberCount: d.memberCount + 1 }
          : d
      )
    );

    const notif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: "Team Member Added",
      message: `${newEmp.name} assigned as ${newEmp.role} in ${newEmp.department}.`,
      time: "Just now",
      type: "team",
      isRead: false,
      linkHref: "/team",
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast("Team Member Added", `${newEmp.name} assigned to ${newEmp.department}.`);
    return newEmp;
  };

  return (
    <NexovaContext.Provider
      value={{
        orders,
        customers,
        employees,
        departments,
        notifications,
        unreadCount,
        reportingPeriod,
        setReportingPeriod,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        addOrder,
        updateOrderStatus,
        addCustomer,
        addEmployee,
        markNotificationRead,
        markAllNotificationsRead,
        metrics,
        toasts,
        dismissToast,
        showToast,
      }}
    >
      {children}
    </NexovaContext.Provider>
  );
}

export function useNexova() {
  const context = useContext(NexovaContext);
  if (!context) {
    throw new Error("useNexova must be used within a NexovaProvider");
  }
  return context;
}
