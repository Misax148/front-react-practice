import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies/Movies";
import MovieForm from "../pages/Movies/MovieForm";
import Actors from "../pages/Actors/Actors";
import ActorFrom from "../pages/Actors/ActorFrom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/create" element={<MovieForm />} />
      <Route path="/movies/edit/:id" element={<MovieForm />} />


      <Route path="/actors" element={<Actors />} />
      <Route path="/actors/create" element={<ActorFrom />} />

    </Routes>
  );
};

export default AppRoutes;
