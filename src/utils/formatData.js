// Format date string to readable format
export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format time to 12-hour format
export const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  return timeStr;
};

// Format currency in Indian Rupees
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

// Capitalize first letter of each word
export const toTitleCase = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Truncate long text
export const truncateText = (text, maxLength = 80) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Get user initials from name
export const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Format appointment status label
export const formatStatus = (status) => {
  const map = {
    pending: "Pending Approval",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
  };
  return map[status] || toTitleCase(status);
};

// Generate unique ID
export const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).slice(2, 7);
};

// Format file size
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Sort array by date field descending
export const sortByDateDesc = (arr, field = "createdAt") => {
  return [...arr].sort((a, b) => new Date(b[field]) - new Date(a[field]));
};
