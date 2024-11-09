import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Movies App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/")} sx={{ marginRight: "25px" }}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/movies")} sx={{ marginRight: "25px" }}>
          Movies
        </Button>
        <Button color="inherit" onClick={() => navigate("/actors")}>
          Actors
        </Button>
        <Avatar 
          sx={{ ml: 5, cursor: 'pointer', bgcolor: 'secondary.main' }}
          onClick={() => navigate('/profile')}
        >
          U
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
