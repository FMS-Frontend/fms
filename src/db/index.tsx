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

export const superUserNavdata = [
  { path: "/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/tenant", label: "Tenant", icon: PiBuildings },
  { path: "/administrator", label: "Administrator", icon: RiShieldUserLine },
  {
    path: "/reporting",
    label: "Reports & Analytics",
    icon: HiOutlineDocumentText,
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
}

export const statsData: StatData[] = [
  {
    icon: <FaChartLine />,
    title: "Total Active Cases",
    value: 89000,
    color: "green",
    isGain: false,
    text: "Down this year",
  },
  {
    icon: <FaUsers />,
    title: "Unasigned Cases",
    value: 45,
    color: "blue",
    isGain: true,
    text: "Up this month",
  },
  {
    icon: <FaDollarSign />,
    title: "Alert Awaiting Review",
    value: 500,
    color: "yellow",
    isGain: true,
    text: "Up from yesterday",
  },
  {
    icon: <FaTasks />,
    title: "Tasks Completed",
    value: 87,
    color: "red",
    isGain: true,
    text: "Up from past month",
  },
];
