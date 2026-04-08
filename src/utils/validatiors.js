// Email format validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password strength: min 6 chars
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};

// Name: non-empty, at least 2 chars
export const isValidName = (name) => {
  return name && name.trim().length >= 2;
};

// Phone: 10-digit Indian number
export const isValidPhone = (phone) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

// Age: between 1 and 120
export const isValidAge = (age) => {
  const n = Number(age);
  return !isNaN(n) && n >= 1 && n <= 120;
};

// Price: positive number
export const isValidPrice = (price) => {
  const n = Number(price);
  return !isNaN(n) && n > 0;
};

// Required field
export const isRequired = (value) => {
  return value !== undefined && value !== null && String(value).trim() !== "";
};

// Passwords match
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

// Validate login form
export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!isRequired(email)) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!isRequired(password)) errors.password = "Password is required";
  else if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters";
  return errors;
};

// Validate register form
export const validateRegisterForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (!isRequired(name)) errors.name = "Full name is required";
  else if (!isValidName(name)) errors.name = "Name must be at least 2 characters";
  if (!isRequired(email)) errors.email = "Email is required";
  else if (!isValidEmail(email)) errors.email = "Enter a valid email address";
  if (!isRequired(password)) errors.password = "Password is required";
  else if (!isValidPassword(password)) errors.password = "Password must be at least 6 characters";
  if (!isRequired(confirmPassword)) errors.confirmPassword = "Please confirm your password";
  else if (!passwordsMatch(password, confirmPassword)) errors.confirmPassword = "Passwords do not match";
  return errors;
};

// Validate appointment form
export const validateAppointmentForm = ({ patientName, patientAge, slot }) => {
  const errors = {};
  if (!isRequired(patientName)) errors.patientName = "Patient name is required";
  if (!isRequired(patientAge)) errors.patientAge = "Age is required";
  else if (!isValidAge(patientAge)) errors.patientAge = "Enter a valid age (1-120)";
  if (!isRequired(slot)) errors.slot = "Please select a time slot";
  return errors;
};

// Validate medicine form
export const validateMedicineForm = ({ name, price }) => {
  const errors = {};
  if (!isRequired(name)) errors.name = "Medicine name is required";
  if (!isRequired(price)) errors.price = "Price is required";
  else if (!isValidPrice(price)) errors.price = "Enter a valid positive price";
  return errors;
};
