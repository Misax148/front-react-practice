import axios from "axios";

// Constantes para la configuracion
const API_CONFIG = {
  BASE_URL: "http://localhost:5051/api/",
  TIMEOUT: 10000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

// Crear instancias de axios con configuracion base
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Interceptor para manejar error de manera global (opcional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se manejan los errores comunes
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Server error");
          break;
        default:
          console.log("An error ocurred");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
