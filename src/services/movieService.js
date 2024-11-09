import api from "./config";

class MovieService {
  static ENDPOINTS = {
    BASE: "/movie",
    BY_GENRE: "/movie/by-genre",
    BY_RATING: "/movie/by-rating",
    WITH_ACTORS: "/movie/with-actors",
  };

  static async getAllMovies() {
    try {
      const response = await api.get(this.ENDPOINTS.BASE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getMovieById(id) {
    try {
      const response = await api.get(`${this.ENDPOINTS.BASE}/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async createMovie(movieData) {
    try {
      const response = await api.post(this.ENDPOINTS.BASE, movieData);
      console.log(response.data)
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async updateMovie(id, movieData) {
    try {
      const response = await api.put(`${this.ENDPOINTS.BASE}/${id}`, movieData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async deleteMovie(id) {
    try {
      await api.delete(`${this.ENDPOINTS.BASE}/${id}`);
      return true;
    } catch (error) {
      this.handleError(error);
    }
  }

  static async getMoviesByGenre(genre) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.BY_GENRE}?genre=${genre}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  
  // Obtener películas por rating
  static async getMoviesByRating(rating) {
    try {
      const response = await api.get(
        `${this.ENDPOINTS.BY_RATING}?rating=${rating}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async getMovieWithActors(movieId) {
    try {
        const response = await api.get(`${this.ENDPOINTS.WITH_ACTORS}/${movieId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Manejador de errores centralizados
  static handleError(error) {
    // El servidor respondio con status code fuera del rango 2xx
    if (error.response) {
      const message =
        error.response.data?.message ||
        "An error ocurred with the movie servide";
      return new Error(message);
    }

    // La peticion fue hecha pero no se recibio respuesta
    if (error.request) {
      return new Error("No response received from the movie service.");
    }

    // Error en lo configuraion de la peticion
    return new Error("Error setting up the request");
  }
}

export default MovieService;
