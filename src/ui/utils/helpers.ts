import { format } from "date-fns";
import { AxiosError } from "axios";

export const extractBackendError = (error: unknown, fallback: string): string => {
  const err = error as AxiosError<any>;
  return err?.response?.data?.message || err?.response?.data?.error || fallback;
};

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


export const maskNumber = (input: string | number): string => {
  // Convert input to a string if it's a number
  const str = input.toString();

  // Check if the length is within the valid range
  if (str.length < 8 || str.length > 11) {
    return "Invalid format";
  }

  // Mask from the 4th character to the 4th from the end
  const maskedPart = str.slice(3, -3).replace(/./g, "*");

  // Combine the unmasked and masked parts
  return str.slice(0, 3) + maskedPart + str.slice(-3);
};



export const maskEmailDomain = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (!domain) return email; // Handle invalid email cases.
  const maskedDomain = domain.replace(/[^.]/g, '*'); // Replace all non-dot characters with '*'.
  return `${localPart}@${maskedDomain}`;
};

export const maskPhoneNumber = (phoneNumber: string): string => {
  if (!/^\d{10}$/.test(phoneNumber)) {
    console.warn("Invalid phone number format");
    return phoneNumber;
  }
  return phoneNumber.replace(/(\d{3})\d{5}(\d{2})/, "$1*****$2");
};



