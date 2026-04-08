// Central API service for MediCurex
// Base URL is configurable through Vite environment variable VITE_API_BASE_URL

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8087/api";

// Generic fetch wrapper with error handling
const request = async (method, endpoint, data = null) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Request failed");
  }

  return json;
};

// Auth API
export const authAPI = {
  register: (userData) => request("POST", "/auth/register", userData),
  login: (credentials) => request("POST", "/auth/login", credentials),
};

// Users API
export const usersAPI = {
  getAll: () => request("GET", "/users"),
  getById: (id) => request("GET", `/users/${id}`),
  create: (user) => request("POST", "/users", user),
  update: (id, user) => request("PUT", `/users/${id}`, user),
  delete: (id) => request("DELETE", `/users/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  getAll: () => request("GET", "/appointments"),
  getByPatient: (patientId) => request("GET", `/appointments/patient/${patientId}`),
  getByDoctor: (doctorId) => request("GET", `/appointments/doctor/${doctorId}`),
  create: (appt) => request("POST", "/appointments", appt),
  update: (id, appt) => request("PUT", `/appointments/${id}`, appt),
  updateStatus: (id, status) => request("PATCH", `/appointments/${id}/status`, { status }),
  delete: (id) => request("DELETE", `/appointments/${id}`),
};

// Doctor Profiles API
export const doctorsAPI = {
  getAll: () => request("GET", "/doctors"),
  getById: (id) => request("GET", `/doctors/${id}`),
  create: (profile) => request("POST", "/doctors", profile),
  update: (id, profile) => request("PUT", `/doctors/${id}`, profile),
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: () => request("GET", "/prescriptions"),
  getByPatient: (patientId) => request("GET", `/prescriptions/patient/${patientId}`),
  create: (prescription) => request("POST", "/prescriptions", prescription),
  update: (id, prescription) => request("PUT", `/prescriptions/${id}`, prescription),
  updateStatus: (id, status) => request("PATCH", `/prescriptions/${id}/status`, { status }),
};

export default { authAPI, usersAPI, appointmentsAPI, doctorsAPI, prescriptionsAPI };
