import api from "./config";

class ActorService {
  static ENDPOINTS = {
    BASE: "/actor",
    BY_MOVIE: "/actor/movie",
    BY_AGE_RANGE: "/actor/age-range",
    MOVIE_COUNT: "/actor/movie-count",
  };

  // Obtener todos los actores
  static async getAllActors() {
    try {
      const response = await api.get(this.ENDPOINTS.BASE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener actor por ID
  static async getActorById(id) {
    try {
      const response = await api.get(`${this.ENDPOINTS.BASE}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Crear nuevo actor
  static async createActor(actorData) {
    try {
      const response = await api.post(this.ENDPOINTS.BASE, actorData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Actualizar actor
  static async updateActor(id, actorData) {
    try {
      const response = await api.put(`${this.ENDPOINTS.BASE}/${id}`, actorData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Eliminar actor
  static async deleteActor(id) {
    try {
      await api.delete(`${this.ENDPOINTS.BASE}/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener actores por película
  static async getActorsByMovie(movieId) {
    try {
      const response = await api.get(`${this.ENDPOINTS.BY_MOVIE}/${movieId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener actores por rango de edad
  static async getActorsByAgeRange(minAge, maxAge) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.BY_AGE_RANGE}?minAge=${minAge}&maxAge=${maxAge}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Obtener cantidad de películas por actor
  static async getMovieCountByActor(actorId) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.MOVIE_COUNT}/${actorId}`
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
        "An error occurred with the actor service";
      return new Error(message);
    }
    if (error.request) {
      return new Error("No response received from the actor service");
    }
    return new Error("Error setting up the request");
  }
}

export default ActorService;
