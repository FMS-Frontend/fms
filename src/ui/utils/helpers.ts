import { format } from "date-fns";

// const userRole = 'superuser';
export function checkUserRole(role: string) {
  if (role === "superuser") {
    return "superuser";
  } else if (role === "admin") {
    return "admin";
  }
}

// Format date to "day dayOfMonth/time"
export const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);

  // Get abbreviated day of the week (e.g., "Mon", "Tue")
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });

  // Get the day of the month
  const dayOfMonth = date.getDate();

  // Get time in "h:mm AM/PM" format
  const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  // Combine parts into the desired format
  return `${day} ${dayOfMonth}/${time}`;
};

// Format timestamp to "HH:MM AM/PM"
export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const formatRuleDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return format(date, "MMMM d, yyyy");
};