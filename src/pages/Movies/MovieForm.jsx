// components/features/movies/MovieForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Card, 
  CardContent,
  MenuItem,
  Rating,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import MovieService from '../../services/movieService';

// Géneros predefinidos para el select
const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Romance'
];

function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Para edición
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [movie, setMovie] = useState({
    title: '',
    releaseDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    description: '',
    genre: '',
    rating: 5.0,
    actors: []
  });

  useEffect(() => {
    // Si hay ID, cargar la película para edición
    if (id) {
      const fetchMovie = async () => {
        try {
          setLoading(true);
          const movieData = await MovieService.getMovieById(id);
          setMovie({
            ...movieData,
            releaseDate: new Date(movieData.releaseDate).toISOString().split('T')[0]
          });
        } catch (err) {
          setError('Failed to load movie data');
          console.error('Error fetching movie:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const movieData = {
        ...movie,
        rating: Number(movie.rating)
      };

      if (id) {
        await MovieService.updateMovie(id, movieData);
      } else {
        await MovieService.createMovie(movieData);
      }

      navigate('/movies');
    } catch (err) {
      setError(err.message || 'Failed to save movie');
      setLoading(false);
    }
  };

  const handleChange = (field) => (e) => {
    setMovie({ ...movie, [field]: e.target.value });
  };

  if (loading && id) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5">
            {id ? 'Edit Movie' : 'Create New Movie'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={movie.title}
            onChange={handleChange('title')}
            margin="normal"
            required
            error={!movie.title}
            helperText={!movie.title && 'Title is required'}
          />

          <TextField
            fullWidth
            label="Description"
            value={movie.description}
            onChange={handleChange('description')}
            margin="normal"
            multiline
            rows={4}
            required
            error={!movie.description}
            helperText={!movie.description && 'Description is required'}
          />

          <TextField
            fullWidth
            select
            label="Genre"
            value={movie.genre}
            onChange={handleChange('genre')}
            margin="normal"
            required
            error={!movie.genre}
            helperText={!movie.genre && 'Genre is required'}
          >
            {GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Release Date"
            type="date"
            value={movie.releaseDate}
            onChange={handleChange('releaseDate')}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography component="legend">Rating (0-10)</Typography>
            <TextField
              type="number"
              value={movie.rating}
              onChange={handleChange('rating')}
              inputProps={{
                min: 0,
                max: 10,
                step: 0.1
              }}
              fullWidth
              required
              error={movie.rating < 0 || movie.rating > 10}
              helperText={
                (movie.rating < 0 || movie.rating > 10) && 
                'Rating must be between 0 and 10'
              }
            />
          </Box>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              {loading ? 'Saving...' : id ? 'Update Movie' : 'Create Movie'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/movies')}
              startIcon={<ArrowBackIcon />}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieForm;