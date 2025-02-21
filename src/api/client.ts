import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Add request/response interceptors if needed
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error); // Handle errors globally
  }
);

export default client;