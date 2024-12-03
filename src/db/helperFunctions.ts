export function capitalizeWords(name: string): string {
  return name
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

// ***** FORMAT DATE TO: "Dec, 2, 2022" ************************
export function formatDate(isoString: string): string {
  const date = new Date(isoString);

  // Options for formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

//****** FORMAT TIME TO: "1:55 PM" ********
export function formatTime(dateString: string): string {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Get the hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  // Return the formatted time string
  return `${hours}:${formattedMinutes} ${ampm}`;
}

// Temporary function to slice first 4 numbers of the TENANT ID (Tenant table)
export function getFirstFourTenantId(input: string): string {
  return input.slice(0, 4);
}

// Style the status on the table
export const getStatusStyles = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Deactivated":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600"; // Default styling
  }
};
