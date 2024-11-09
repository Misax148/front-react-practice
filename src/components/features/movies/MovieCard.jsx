import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Rating,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Movie as MovieIcon,
  BrokenImage as BrokenImageIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie, onDelete }) {
  const navigate = useNavigate();
  const releaseYear = new Date(movie.releaseDate).getFullYear();

  // Función para manejar errores de carga de imagen
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      {/* Contenedor de imagen con respaldo */}
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        {movie.imageUrl ? (
          <>
            <CardMedia
              component="img"
              image={movie.imageUrl}
              alt={movie.title}
              onError={handleImageError}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            {/* Fallback para cuando la imagen falla */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.200',
                color: 'grey.500'
              }}
            >
              <BrokenImageIcon sx={{ fontSize: 40 }} />
            </Box>
          </>
        ) : (
          // Placeholder cuando no hay imagen
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.200',
              color: 'grey.500'
            }}
          >
            <MovieIcon sx={{ fontSize: 40 }} />
          </Box>
        )}

        {/* Overlay con el género */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1
          }}
        >
          <Chip
            label={movie.genre}
            size="small"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '& .MuiChip-label': {
                fontWeight: 'bold'
              }
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography variant="h6" component="div" noWrap sx={{ mb: 1 }}>
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '4.5em'
          }}
        >
          {movie.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Rating:
          </Typography>
          <Rating
            value={movie.rating / 2}
            precision={0.5}
            readOnly
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Released: {releaseYear}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <IconButton
          size="small"
          onClick={() => navigate(`/movies/edit/${movie.id}`)}
          color="primary"
          title="Edit movie"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete()}
          title="Delete movie"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCard;