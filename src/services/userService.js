import api from "./config";

class UserService {
  static ENDPOINTS = {
    BASE: "/user",
    BY_EMAIL: "/user/by-email",
    CHECK_EMAIL: "/user/check-email",
  };

  // Obtener usuario por ID
  static async getUserById(id) {
    try {
      const response = await api.get(`${this.ENDPOINTS.BASE}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Crear nuevo usuario
  static async createUser(userData) {
    try {
      const response = await api.post(this.ENDPOINTS.BASE, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Actualizar usuario
  static async updateUser(id, userData) {
    try {
      const response = await api.put(`${this.ENDPOINTS.BASE}/${id}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Eliminar usuario
  static async deleteUser(id) {
    try {
      await api.delete(`${this.ENDPOINTS.BASE}/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener usuario por email
  static async getUserByEmail(email) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.BY_EMAIL}?email=${email}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Verificar si el email es único
  static async isEmailUnique(email) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.CHECK_EMAIL}?email=${email}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Manejador de errores centralizado
  static handleError(error) {
    if (error.response) {
      const message =
        error.response.data?.message ||
        "An error occurred with the user service";
      return new Error(message);
    }
    if (error.request) {
      return new Error("No response received from the user service");
    }
    return new Error("Error setting up the request");
  }
}

export default UserService;
