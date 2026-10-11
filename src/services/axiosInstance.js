import axios from "axios";

const resolveBaseUrl = () => {
  const rawUrl =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:5000/api/v1";

  const clean = rawUrl.trim().replace(/\/+$/, "");
  if (!clean.endsWith("/api/v1") && !clean.endsWith("/api")) {
    return `${clean}/api/v1`;
  }
  return clean;
};

/**
 * Enterprise Axios Instance
 * Configured with baseURL, timeout, request & response interceptors
 */
export const axiosInstance = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: Attach Auth Token if present & log in development
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("shash_auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Standardize data unwrap & centralized error normalization
axiosInstance.interceptors.response.use(
  (response) => {
    // Return standard response data envelope
    return response.data;
  },
  (error) => {
    const customError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected network error occurred",
      statusCode: error.response?.status || 500,
      errors: error.response?.data?.errors || [],
    };

    console.warn("⚠️ API Error Interceptor:", customError.message);
    return Promise.reject(customError);
  }
);

export default axiosInstance;
