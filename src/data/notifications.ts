import { NotificationItem } from "@/types";

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Order NX-1048 Completed",
    message: "Urban Stitch Co. Cap Logo files (DST + Run Sheet) sent to client.",
    time: "10 mins ago",
    type: "order",
    isRead: false,
    linkHref: "/orders?id=NX-1048",
  },
  {
    id: "notif-2",
    title: "Upfront Payment Received",
    message: "$180 upfront secured for Order NX-1052 (Summit Tactical Gear).",
    time: "42 mins ago",
    type: "payment",
    isRead: false,
    linkHref: "/orders?id=NX-1052",
  },
  {
    id: "notif-3",
    title: "Order Assigned to Digitizing",
    message: "NX-1050 (Cyber Kitsune Back) assigned to Tariq Al-Mansoor.",
    time: "2 hours ago",
    type: "order",
    isRead: false,
    linkHref: "/orders?id=NX-1050",
  },
  {
    id: "notif-4",
    title: "New Customer Registered",
    message: "Fiona Gallagher from Southside Boxing Club created an account.",
    time: "4 hours ago",
    type: "customer",
    isRead: true,
    linkHref: "/customers",
  },
  {
    id: "notif-5",
    title: "Proof Approved by QC",
    message: "NX-1049 Zenith Esports sleeve sew-out passed Tajima inspection.",
    time: "6 hours ago",
    type: "order",
    isRead: true,
    linkHref: "/orders?id=NX-1049",
  },
];
