import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineUsers,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { PiBuildings } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import { PiFolderSimpleUser, PiIntersectFill } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";

export const superUserNavdata = [
  { path: "/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/administrator", label: "Administrator", icon: RiShieldUserLine },
  { path: "/tenant", label: "Tenant", icon: PiBuildings },
  {
    path: "/reports",
    label: "Reports",
    icon: HiOutlineDocumentText,
  },
  {
    path: "/analytics",
    label: "Analytics",
    icon: IoStatsChart,
  },
  {
    path: "/audit",
    label: "Audit & Compliance",
    icon: HiOutlineClipboardDocumentCheck,
  },
];
export const adminNavData = [
  { path: "/admin/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/admin/users", label: "Users", icon: HiOutlineUsers },
  {
    path: "/admin/reporting",
    label: "Reports & Analytics",
    icon: HiOutlineDocumentText,
  },
  {
    path: "/admin/audit",
    label: "Audit & Compliance",
    icon: HiOutlineClipboardDocumentCheck,
  },
  {
    path: "/admin/integration",
    label: "Integration",
    icon: PiIntersectFill,
  },
];

export const managerNavData = [
  { path: "/manager/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/manager/alerts", label: "Alerts & Rules", icon: RiShieldUserLine },
  {
    path: "/manager/cases",
    label: "Case Management",
    icon: PiFolderSimpleUser,
  },
  { path: "/manager/analytics", label: "Analytics", icon: BsGraphUpArrow },
];

// statData
import { ReactNode } from "react";
import { FaChartLine, FaUsers, FaDollarSign, FaTasks } from "react-icons/fa";

interface StatData {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: "red" | "green" | "blue" | "yellow";
  isGain: boolean;
  text: string;
  percent: number;
}

export const statsData: StatData[] = [
  {
    icon: <FaChartLine />,
    title: "Total Active Cases",
    value: 89000,
    color: "green",
    isGain: false,
    text: "Down this year",
    percent: 4.3,
  },
  {
    icon: <FaUsers />,
    title: "Unasigned Cases",
    value: 45,
    color: "blue",
    isGain: true,
    text: "Up this month",
    percent: 8.5,
  },
  {
    icon: <FaDollarSign />,
    title: "Alert Awaiting Review",
    value: 500,
    color: "yellow",
    isGain: true,
    text: "Up from yesterday",
    percent: 1.8
  },
  {
    icon: <FaTasks />,
    title: "Cases Closed This Month",
    value: 33,
    color: "red",
    isGain: true,
    text: "Up from past month",
    percent: 1.3,
  },
];

//
export interface Tenant {
  id: number;
  alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
  timeStamp: string;
  status: "Active" | "Unassigned" | "Deactivated";
}

export const mockData: Tenant[] = [
  { id: 1, alertType: "Login", timeStamp: "2024-11-07T09:23", status: "Active" },
  { id: 2, alertType: "Logout", timeStamp: "2024-11-07T10:15:00Z", status: "Unassigned" },
  { id: 3, alertType: "Edit", timeStamp: "2024-11-07T11:30:00Z", status: "Deactivated" },
  { id: 4, alertType: "Update", timeStamp: "2024-11-07T12:45:00Z", status: "Active" },
  { id: 5, alertType: "Create", timeStamp: "2024-11-07T13:50:00Z", status: "Unassigned" },
  { id: 6, alertType: "Delete", timeStamp: "2024-11-07T15:05:00Z", status: "Deactivated" }
];



interface RecentProp {
  id: number;
  cases: string;
  user: {
    image: string;  // URL or path to the user's image
    name: string;   // Name of the user
  };
  date: string;
}



export const recentData: RecentProp[] = [
  {
    id: 1,
    cases: "Case Created",
    user: {
      image: "https://example.com/user1.jpg",
      name: "Alice Johnson"
    },
    date: "2024-11-07T09:23:00Z"
  },
  {
    id: 2,
    cases: "Case Closed",
    user: {
      image: "https://example.com/user2.jpg",
      name: "Bob Smith"
    },
    date: "2024-11-07T11:15:00Z"
  },
  {
    id: 3,
    cases: "Alert Review",
    user: {
      image: "https://example.com/user3.jpg",
      name: "Carol Lee"
    },
    date: "2024-11-07T14:30:00Z"
  },
  {
    id: 4,
    cases: "Case Created",
    user: {
      image: "https://example.com/user4.jpg",
      name: "David Kim"
    },
    date: "2024-11-08T08:00:00Z"
  },
  {
    id: 5,
    cases: "Case Closed",
    user: {
      image: "https://example.com/user5.jpg",
      name: "Eva Green"
    },
    date: "2024-11-08T10:45:00Z"
  },
  {
    id: 6,
    cases: "Alert Review",
    user: {
      image: "https://example.com/user6.jpg",
      name: "Frank White"
    },
    date: "2024-11-08T13:10:00Z"
  }
];




