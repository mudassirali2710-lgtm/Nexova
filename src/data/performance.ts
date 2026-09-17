import { ReportingPeriod } from "@/types";

export interface MonthlyRevenuePoint {
  month: string;
  revenue: number;
  orders: number;
  completed: number;
  target: number;
}

export const monthlyRevenueData: MonthlyRevenuePoint[] = [
  { month: "Jan", revenue: 32400, orders: 124, completed: 112, target: 30000 },
  { month: "Feb", revenue: 35800, orders: 138, completed: 125, target: 32000 },
  { month: "Mar", revenue: 38900, orders: 152, completed: 140, target: 35000 },
  { month: "Apr", revenue: 41200, orders: 160, completed: 148, target: 38000 },
  { month: "May", revenue: 44500, orders: 172, completed: 158, target: 40000 },
  { month: "Jun", revenue: 43100, orders: 165, completed: 151, target: 42000 },
  { month: "Jul", revenue: 46800, orders: 179, completed: 164, target: 45000 },
  { month: "Aug", revenue: 47900, orders: 182, completed: 169, target: 46000 },
  { month: "Sep", revenue: 48620, orders: 186, completed: 142, target: 50000 },
];

export interface PeriodSummary {
  revenue: number;
  revenueComparison: string;
  orders: number;
  ordersComparison: string;
  upfrontPayments: number;
  upfrontComparison: string;
  completedOrders: number;
  completedComparison: string;
  outstandingBalance: number;
  cancelledOrders: number;
  completionRate: number; // in %
  averageOrderValue: number;
  workflow: {
    new: number;
    inReview: number;
    digitizing: number;
    production: number;
    completed: number;
    cancelled: number;
  };
}

export const periodMetrics: Record<ReportingPeriod, PeriodSummary> = {
  "this-month": {
    revenue: 48620,
    revenueComparison: "+12.8% vs last month",
    orders: 186,
    ordersComparison: "+8.4% vs last month",
    upfrontPayments: 14850,
    upfrontComparison: "+14.2% vs last month",
    completedOrders: 142,
    completedComparison: "+9.1% vs last month",
    outstandingBalance: 8420,
    cancelledOrders: 5,
    completionRate: 96.6,
    averageOrderValue: 261.4,
    workflow: {
      new: 18,
      inReview: 14,
      digitizing: 21,
      production: 16,
      completed: 142,
      cancelled: 5,
    },
  },
  "this-quarter": {
    revenue: 143320,
    revenueComparison: "+16.5% vs Q2",
    orders: 547,
    ordersComparison: "+11.2% vs Q2",
    upfrontPayments: 43800,
    upfrontComparison: "+18.0% vs Q2",
    completedOrders: 475,
    completedComparison: "+13.4% vs Q2",
    outstandingBalance: 24650,
    cancelledOrders: 12,
    completionRate: 97.5,
    averageOrderValue: 262.0,
    workflow: {
      new: 24,
      inReview: 19,
      digitizing: 26,
      production: 21,
      completed: 475,
      cancelled: 12,
    },
  },
  "year-to-date": {
    revenue: 389220,
    revenueComparison: "+24.6% vs 2023 YTD",
    orders: 1458,
    ordersComparison: "+19.8% vs 2023 YTD",
    upfrontPayments: 119400,
    upfrontComparison: "+22.1% vs 2023 YTD",
    completedOrders: 1309,
    completedComparison: "+21.5% vs 2023 YTD",
    outstandingBalance: 61800,
    cancelledOrders: 34,
    completionRate: 97.4,
    averageOrderValue: 266.9,
    workflow: {
      new: 18,
      inReview: 14,
      digitizing: 21,
      production: 16,
      completed: 1309,
      cancelled: 34,
    },
  },
  custom: {
    revenue: 52400,
    revenueComparison: "+10.2% custom window",
    orders: 198,
    ordersComparison: "+7.5% custom window",
    upfrontPayments: 16200,
    upfrontComparison: "+11.8% custom window",
    completedOrders: 156,
    completedComparison: "+8.2% custom window",
    outstandingBalance: 9800,
    cancelledOrders: 6,
    completionRate: 96.3,
    averageOrderValue: 264.6,
    workflow: {
      new: 15,
      inReview: 12,
      digitizing: 19,
      production: 14,
      completed: 156,
      cancelled: 6,
    },
  },
};
