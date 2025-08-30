import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MovieDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    if (id !== undefined && movies[id]) {
      setMovie(movies[id]);
    }
  }, [id]);

  if (!movie) {
    return (
      <div className="text-center text-gray-400 mt-20">
        <p>Movie not found!</p>
        <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg mb-8">
        {movie.image && (
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-3xl font-bold">{movie.name}</h1>
          <p className="text-gray-100 mt-2">{movie.description}</p>
        </div>
      </div>

      <div className="space-y-4 text-gray-10">
        <p><strong>- Genre:</strong> {movie.genre}</p>
        <p><strong>- Language:</strong> {movie.language}</p>
        <p><strong>- Duration:</strong> {movie.duration}</p>
        <p><strong>- Release Date:</strong> {movie.date}</p>
      </div>

      <button  onClick={() => navigate("/")}  className="mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white"> Back</button>
    </div>
  );
}
