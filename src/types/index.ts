export type OrderStatus =
  | "New"
  | "In Review"
  | "Digitizing"
  | "Production / Ready"
  | "Completed"
  | "Cancelled";

export type PaymentStatus = "Paid in Full" | "Partially Paid" | "Unpaid";

export type EmbroideryPlacement =
  | "Cap Logo"
  | "Left Chest Logo"
  | "Front Chest Logo"
  | "Jacket Back"
  | "Sleeve Logo"
  | "Bag Logo"
  | "Hat Logo"
  | "Uniform Logo";

export type DepartmentType =
  | "Management"
  | "Sales & Calls"
  | "Email / Outreach"
  | "Promotion / Marketing"
  | "Deal Closing"
  | "Digitizing / Production";

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface Order {
  id: string; // e.g. NX-1048
  customerId: string;
  customerName: string;
  company: string;
  phone: string;
  email: string;
  designName: string;
  placement: EmbroideryPlacement;
  stitchCount: number;
  threadColors: number;
  fileFormat: string; // "DST", "PES", "EMB", "EXP"
  assignedDepartment: DepartmentType;
  assignedEmployee: string;
  upfrontAmount: number;
  totalAmount: number;
  remainingBalance: number; // totalAmount - upfrontAmount
  paymentStatus: PaymentStatus;
  orderDate: string;
  dueDate: string;
  status: OrderStatus;
  notes?: string;
  dimensions?: string; // e.g. "3.5 x 2.2 in"
  garmentType?: string; // e.g. "Flexfit 6277 Cotton Twill", "Polo Shirt"
  timeline: OrderTimelineEvent[];
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  registrationDate: string;
  totalOrders: number;
  totalSpent: number;
  outstandingBalance: number;
  latestOrderId?: string;
  latestOrderDate?: string;
  status: "Active" | "VIP" | "New" | "Inactive";
  city: string;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: DepartmentType;
  role: string;
  joiningDate: string;
  ordersHandled: number;
  completedOrders: number;
  completionRate: number; // e.g. 98 (%)
  currentWorkload: number; // Active orders currently in progress
  // For Sales / Outreach / Deals:
  revenueOrSales?: number;
  monthlyTarget?: number;
  // For Digitizing / Production:
  stitchOutput?: string; // e.g. "140K stitches"
  status: "Active" | "On Leave";
  avatarBg?: string;
}

export interface DepartmentInfo {
  name: DepartmentType;
  memberCount: number;
  activeOrders: number;
  completedOrders: number;
  workloadPercent: number;
  outputMetric: string; // e.g. "$20,450 Booked" or "1.42M Stitches"
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "order" | "customer" | "payment" | "team";
  isRead: boolean;
  linkHref?: string;
}

export type ReportingPeriod = "this-month" | "this-quarter" | "year-to-date" | "custom";
