import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AddMovie from "./pages/AddMovie.jsx";
import MovieDetails from "./pages/MovieDetails.jsx"; // 🔹 new import
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="add" element={<AddMovie />} />
        <Route path="movie/:id" element={<MovieDetails />} /> {/* 🔹 new route */}
      </Route>
    </Routes>
  </BrowserRouter>
);
