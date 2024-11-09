import React from 'react'
import { Box, Typography, Card, CardContent } from '@mui/material';

function Home() {
  return (
    <Box> 
      <Typography variant="h4" gutterBottom>
        Welcome to Movies App
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            What you can do here:
          </Typography>
          <Typography>• View and manage movies</Typography>
          <Typography>• View and manage actors</Typography>
          <Typography>• Create new movies and actors</Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Home