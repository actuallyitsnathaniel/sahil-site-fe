export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatToCopy = (hash: string): string => {
  return hash
    .replace(/^#/, "") // Remove leading '#'
    .split("-") // Split by '-'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join with spaces
};

export const formatToHash = (text: string): string => {
  return `#${text
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-")}`; // Replace spaces with hyphens
};
