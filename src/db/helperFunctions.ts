export function capitalizeWords(name: string): string {
  return name
    .toLowerCase() // Convert the entire string to lowercase
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

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

// Temporary function to slice first 4 numbers of the TENANT ID (Tenant table)
export function getFirstFourTenantId(input: string): string {
  return input.slice(0, 4);
}
