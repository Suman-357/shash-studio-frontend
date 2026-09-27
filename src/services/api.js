import axiosInstance from "./axiosInstance";

/**
 * Fetch all workshops from backend
 */
export async function getWorkshops(category = "") {
  const url = category && category !== "all" ? `/workshops?category=${category}` : "/workshops";
  return axiosInstance.get(url);
}

/**
 * Fetch single workshop by ID or slug
 */
export async function getWorkshopById(idOrSlug) {
  return axiosInstance.get(`/workshops/${idOrSlug}`);
}

/**
 * Submit a new workshop registration
 */
export async function submitRegistration(registrationData) {
  return axiosInstance.post("/registrations", registrationData);
}

/**
 * Fetch registration by booking ID
 */
export async function getRegistrationByBookingId(bookingId) {
  return axiosInstance.get(`/registrations/${bookingId}`);
}

/**
 * Submit a student contact / scholarship inquiry
 */
export async function submitInquiry(inquiryData) {
  return axiosInstance.post("/inquiries", inquiryData);
}

/**
 * Check backend health
 */
export async function checkBackendHealth() {
  return axiosInstance.get("/health");
}
