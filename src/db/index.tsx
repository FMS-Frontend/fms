import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineUsers,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { MdOutlineDashboard } from "react-icons/md";
import { RiShieldUserLine } from "react-icons/ri";
import { BsGraphUpArrow } from "react-icons/bs";
import {
  PiFolderSimpleUser,
  PiIntersectFill,
  PiBuildings,
} from "react-icons/pi";
import { IoStatsChart, IoAlertCircleOutline } from "react-icons/io5";
import { GoLaw } from "react-icons/go";

export const superUserNavdata = [
  { path: "/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/administrator", label: "Administrator", icon: RiShieldUserLine },
  { path: "/organizations", label: "Organizations", icon: PiBuildings },
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
    label: "Reports",
    icon: HiOutlineDocumentText,
  },
  {
    path: "/admin/analytics",
    label: "Analytics",
    icon: IoStatsChart,
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
  { path: "/manager/alerts", label: "Alerts", icon: IoAlertCircleOutline },
  { path: "/manager/rules", label: "Rules", icon: GoLaw },
  {
    path: "/manager/cases",
    label: "Cases",
    icon: PiFolderSimpleUser,
  },
  { path: "/manager/analytics", label: "Analytics", icon: BsGraphUpArrow },
];

export const analystNavData = [
  { path: "/analyst/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/analyst/alerts", label: "Alerts", icon: IoAlertCircleOutline },
  { path: "/analyst/rules", label: "Rules", icon: GoLaw },
  {
    path: "/analyst/cases",
    label: "Cases",
    icon: PiFolderSimpleUser,
  },
  { path: "/analyst/analytics", label: "Analytics", icon: BsGraphUpArrow },
];
export const auditorNavData = [
  { path: "/auditor/dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { path: "/auditor/auditlogs", label: "Audit Logs", icon: LuBox },
  { path: "/auditor/report", label: "Compliance Reports", icon: HiOutlineDocumentText },
  { path: "/auditor/rules", label: "Rules History", icon: GoLaw },
  { path: "/auditor/alerts", label: "Alerts Overview", icon: IoAlertCircleOutline },

  {
    path: "/auditor/cases",
    label: "Cases",
    icon: PiFolderSimpleUser,
  },
  { path: "/auditor/organization", label: "Organization", icon: BsGraphUpArrow },
  {
    path: "/auditor/integration",
    label: "Integration",
    icon: PiIntersectFill,
  },
];

// statData
import { ReactNode } from "react";
import { FaChartLine, FaUsers, } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";

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
    icon: <IoTimerOutline />,
    title: "Alert Awaiting Review",
    value: 500,
    color: "red",
    isGain: true,
    text: "Up from yesterday",
    percent: 1.8,
  },
  {
    icon: <LuBox />,
    title: "Cases Closed This Month",
    value: 33,
    color: "yellow",
    isGain: true,
    text: "Up from past month",
    percent: 1.3,
  },
];

export const statsData2: StatData[] = [
  {
    icon: <FaChartLine />,
    title: "Total Users Created",
    value: 89000,
    color: "green",
    isGain: false,
    text: "Down this year",
    percent: 4.3,
  },
  {
    icon: <FaUsers />,
    title: "New Users",
    value: 45,
    color: "blue",
    isGain: true,
    text: "Up this month",
    percent: 8.5,
  },
  {
    icon: <IoTimerOutline />,
    title: "Active Sessions",
    value: 500,
    color: "red",
    isGain: true,
    text: "Up from yesterday",
    percent: 1.8,
  },
  {
    icon: <LuBox />,
    title: "Total Integrations",
    value: 33,
    color: "yellow",
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

export const priorityData: Tenant[] = [
  {
    id: 1,
    alertType: "Login",
    timeStamp: "2024-11-07T09:23:00Z",
    status: "Active",
  },
  {
    id: 2,
    alertType: "Logout",
    timeStamp: "2024-11-07T10:15:00Z",
    status: "Unassigned",
  },
  {
    id: 3,
    alertType: "Edit",
    timeStamp: "2024-11-07T11:30:00Z",
    status: "Deactivated",
  },
  {
    id: 4,
    alertType: "Update",
    timeStamp: "2024-11-07T12:45:00Z",
    status: "Active",
  },
  {
    id: 5,
    alertType: "Create",
    timeStamp: "2024-11-07T13:50:00Z",
    status: "Unassigned",
  },
  {
    id: 6,
    alertType: "Delete",
    timeStamp: "2024-11-07T15:05:00Z",
    status: "Deactivated",
  },
];

interface RecentProp {
  id: number;
  cases: string;
  user: {
    image: string;
    name: string;
  };
  date: string;
}

export const recentData: RecentProp[] = [
  {
    id: 1,
    cases: "Case Created",
    user: {
      image: "https://example.com/user1.jpg",
      name: "Alice Johnson",
    },
    date: "2024-11-07T09:23:00Z",
  },
  {
    id: 2,
    cases: "Case Closed",
    user: {
      image: "https://example.com/user2.jpg",
      name: "Bob Smith",
    },
    date: "2024-11-07T11:15:00Z",
  },
  {
    id: 3,
    cases: "Alert Review",
    user: {
      image: "https://example.com/user3.jpg",
      name: "Carol Lee",
    },
    date: "2024-11-07T14:30:00Z",
  },
  {
    id: 4,
    cases: "Case Created",
    user: {
      image: "https://example.com/user4.jpg",
      name: "David Kim",
    },
    date: "2024-11-08T08:00:00Z",
  },
  {
    id: 5,
    cases: "Case Closed",
    user: {
      image: "https://example.com/user5.jpg",
      name: "Eva Green",
    },
    date: "2024-11-08T10:45:00Z",
  },
  {
    id: 6,
    cases: "Alert Review",
    user: {
      image: "https://example.com/user6.jpg",
      name: "Frank White",
    },
    date: "2024-11-08T13:10:00Z",
  },
];


export interface Alert {
  id: string;
  type: string;
  status: string;
  severity: string;
  timestamp: string;
  actions: string;
}

export const alertsData: Alert[] = [
  {
    id: "A101",
    type: "Login",
    status: "Closed",
    severity: "Critical",
    timestamp: "2024-12-01T10:00:00Z",
    actions: "View",
  },
  {
    id: "A102",
    type: "Payment",
    status: "Closed",
    severity: "High",
    timestamp: "2024-12-02T11:15:00Z",
    actions: "View",
  },
  {
    id: "A103",
    type: "Transfer",
    status: "Open",
    severity: "Medium",
    timestamp: "2024-12-03T12:30:00Z",
    actions: "View",
  },
  {
    id: "A104",
    type: "Transfer",
    status: "Closed",
    severity: "Critical",
    timestamp: "2024-12-04T13:45:00Z",
    actions: "View",
  },
  {
    id: "A105",
    type: "Payment",
    status: "Closed",
    severity: "Critical",
    timestamp: "2024-12-05T15:00:00Z",
    actions: "View",
  },
  {
    id: "A106",
    type: "Login",
    status: "Open",
    severity: "High",
    timestamp: "2024-12-06T16:15:00Z",
    actions: "View",
  },
  {
    id: "A107",
    type: "Transfer",
    status: "Open",
    severity: "Medium",
    timestamp: "2024-12-07T17:30:00Z",
    actions: "View",
  },
  {
    id: "A108",
    type: "Transfer",
    status: "Closed",
    severity: "Medium",
    timestamp: "2024-12-08T18:45:00Z",
    actions: "View",
  },
  {
    id: "A109",
    type: "Login",
    status: "Closed",
    severity: "Critical",
    timestamp: "2024-12-09T20:00:00Z",
    actions: "View",
  },
  {
    id: "A110",
    type: "Payment",
    status: "Open",
    severity: "High",
    timestamp: "2024-12-10T21:15:00Z",
    actions: "View",
  },
];

import { RuleTableRowProps } from "../features/manager/rules/RuleTableRow";
export const rulesData: RuleTableRowProps[] = [
  {
    ruleId: "R001",
    ruleName: "Login Check",
    status: "Active",
    assignedTo: {
      image: "/images/user1.jpg",
      name: "Alice Johnson",
    },
    lastModified: "2024-12-07T11:30:00Z",
    index: 0,
  },
  {
    ruleId: "R002",
    ruleName: "Payment Cap",
    status: "Inactive",
    assignedTo: {
      image: "/images/user2.jpg",
      name: "Catherine Lee",
    },
    lastModified: "2024-12-15T08:20:00Z",
    index: 1,
  },
  {
    ruleId: "R003",
    ruleName: "IP Block",
    status: "Active",
    assignedTo: {
      image: "/images/user3.jpg",
      name: "Catherine Lee",
    },
    lastModified: "2024-12-08T14:00:00Z",
    index: 2,
  },
  {
    ruleId: "R004",
    ruleName: "Email Verification",
    status: "Inactive",
    assignedTo: {
      image: "/images/user4.jpg",
      name: "David Brown",
    },
    lastModified: "2024-12-07T09:45:00Z",
    index: 3,
  },
  {
    ruleId: "R005",
    ruleName: "Password Strength",
    status: "Active",
    assignedTo: {
      image: "/images/user5.jpg",
      name: "Eleanor Martinez",
    },
    lastModified: "2024-12-08T16:30:00Z",
    index: 4,
  },
  {
    ruleId: "R006",
    ruleName: "Multi-Factor Auth",
    status: "Inactive",
    assignedTo: {
      image: "/images/user6.jpg",
      name: "Frank Williams",
    },
    lastModified: "2024-01-10T12:10:00Z",
    index: 5,
  },
  {
    ruleId: "R007",
    ruleName: "Transaction Limits",
    status: "Active",
    assignedTo: {
      image: "/images/user7.jpg",
      name: "Grace Kim",
    },
    lastModified: "2024-07-22T10:00:00Z",
    index: 6,
  },
  {
    ruleId: "R008",
    ruleName: "Geolocation Check",
    status: "Inactive",
    assignedTo: {
      image: "/images/user8.jpg",
      name: "Henry Allen",
    },
    lastModified: "2024-08-19T13:15:00Z",
    index: 7,
  },
  {
    ruleId: "R009",
    ruleName: "Device Blacklist",
    status: "Active",
    assignedTo: {
      image: "/images/user9.jpg",
      name: "David Brown",
    },
    lastModified: "2024-09-30T15:40:00Z",
    index: 8,
  },
  {
    ruleId: "R010",
    ruleName: "Suspicious Login Alert",
    status: "Inactive",
    assignedTo: {
      image: "/images/user10.jpg",
      name: "Jack Taylor",
    },
    lastModified: "2024-10-12T11:00:00Z",
    index: 9,
  },
];

export interface CasesTableRowProps {
  caseId: string;
  priority: "Critical" | "High" | "Medium";
  status: "Open" | "Closed";
  assignedTo: { image: string; name: string };
  lastModified: string;
  index: number;
}

export const casesData: CasesTableRowProps[] = [
  {
    caseId: "C001",
    priority: "Critical",
    status: "Open",
    assignedTo: {
      image: "/images/user1.jpg",
      name: "Alice Johnson",
    },
    lastModified: "2024-12-07T11:30:00Z",
    index: 0,
  },
  {
    caseId: "C002",
    priority: "Medium",
    status: "Closed",
    assignedTo: {
      image: "/images/user2.jpg",
      name: "Catherine Lee",
    },
    lastModified: "2024-12-15T08:20:00Z",
    index: 1,
  },
  {
    caseId: "C003",
    priority: "High",
    status: "Open",
    assignedTo: {
      image: "/images/user3.jpg",
      name: "David Brown",
    },
    lastModified: "2024-12-08T14:00:00Z",
    index: 2,
  },
  {
    caseId: "C004",
    priority: "Medium",
    status: "Closed",
    assignedTo: {
      image: "/images/user4.jpg",
      name: "Eleanor Martinez",
    },
    lastModified: "2024-12-07T09:45:00Z",
    index: 3,
  },
  {
    caseId: "C005",
    priority: "Critical",
    status: "Open",
    assignedTo: {
      image: "/images/user5.jpg",
      name: "Frank Williams",
    },
    lastModified: "2024-12-08T16:30:00Z",
    index: 4,
  },
  {
    caseId: "C006",
    priority: "High",
    status: "Closed",
    assignedTo: {
      image: "/images/user6.jpg",
      name: "Grace Kim",
    },
    lastModified: "2024-01-10T12:10:00Z",
    index: 5,
  },
  {
    caseId: "C007",
    priority: "Critical",
    status: "Open",
    assignedTo: {
      image: "/images/user7.jpg",
      name: "Henry Allen",
    },
    lastModified: "2024-07-22T10:00:00Z",
    index: 6,
  },
  {
    caseId: "C008",
    priority: "Medium",
    status: "Closed",
    assignedTo: {
      image: "/images/user8.jpg",
      name: "Jack Taylor",
    },
    lastModified: "2024-08-19T13:15:00Z",
    index: 7,
  },
  {
    caseId: "C009",
    priority: "High",
    status: "Open",
    assignedTo: {
      image: "/images/user9.jpg",
      name: "Alice Johnson",
    },
    lastModified: "2024-09-30T15:40:00Z",
    index: 8,
  },
  {
    caseId: "C010",
    priority: "Critical",
    status: "Closed",
    assignedTo: {
      image: "/images/user10.jpg",
      name: "Catherine Lee",
    },
    lastModified: "2024-10-12T11:00:00Z",
    index: 9,
  },
];
