import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MovieService from '../../services/movieService';
import MovieCard from '../../components/features/movies/MovieCard';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, movieId: null });
  const navigate = useNavigate();

  // Función para cargar películas
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await MovieService.getAllMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar películas al montar el componente
  useEffect(() => {
    loadMovies();
  }, []);

  // Función para manejar la eliminación
  const handleDelete = async (movieId) => {
    try {
      await MovieService.deleteMovie(movieId);
      // Recargar la lista después de eliminar
      loadMovies();
      setDeleteDialog({ open: false, movieId: null });
    } catch (err) {
      setError('Failed to delete movie. Please try again later.');
      console.error('Error deleting movie:', err);
    }
  };

  // Pasar la función de eliminación al MovieCard
  const onDeleteClick = (movieId) => {
    setDeleteDialog({ open: true, movieId });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5">Movies</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/movies/create')}
          startIcon={<AddIcon />}
        >
          Create Movie
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {movies.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 4,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 1
        }}>
          <Typography variant="h6" color="text.secondary">
            No movies found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Start by creating a new movie
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {movies.map(movie => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard 
                movie={movie} 
                onDelete={() => onDeleteClick(movie.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, movieId: null })}
      >
        <DialogTitle>Delete Movie</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this movie? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, movieId: null })}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.movieId)}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Movies;