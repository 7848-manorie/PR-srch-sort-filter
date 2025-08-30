import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import staticMovies from "./movies";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies"));
    if (storedMovies && storedMovies.length > 0) {
      setMovies(storedMovies);
    } else {
      setMovies(staticMovies);
      localStorage.setItem("movies", JSON.stringify(staticMovies));
    }
  }, []);

  const handleDelete = (index) => {
    const updatedMovies = movies.filter((_, i) => i !== index);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  const handleUpdate = (index) => {
    navigate(`/add?edit=${index}`);
  };

  const filteredMovies = movies
    .filter((movie) =>
      movie.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((movie) =>
      filter ? movie.genre.toLowerCase() === filter.toLowerCase() : true
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "duration") return a.duration.localeCompare(b.duration);
      return 0;
    });

  if (movies.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>No movies added yet. Go to "Add Movie".</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
        <img
          src="https://i.pinimg.com/1200x/ce/a6/71/cea671eca0d14db693e670ae648d5fb3.jpg"
          alt="Featured Banner"
          className="w-full h-full object-cover"/>
        <div className="absolute bottom-8 left-8 text-white max-w-lg">
          <h2 className="text-3xl font-bold">Game of Thrones</h2>
          <p className="text-gray-300 mt-2 line-clamp-3">
            Nine noble families wage war against each other to gain control
            over the mythical land of Westeros, while an ancient enemy
            returns after being dormant for millennia.
          </p>
          <div className="flex gap-3 mt-4 text-sm">
            <span className="px-3 py-1 bg-white/50 text-gray-800 rounded-full">Fantasy</span>
            <span className="px-3 py-1 bg-white/50 text-gray-800 rounded-full">English</span>
            <span className="px-3 py-1 bg-white/50 text-gray-800 rounded-full">8 Seasons</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg"/>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg">
          <option value="">Sort</option>
          <option value="name">By Name</option>
          <option value="duration">By Duration</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-lg">
          <option value="">Filter by Genre</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-black mb-6">All Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie, index) => (
            <div
              key={index}
              onClick={() => navigate(`/movie/${index}`)}
              className="bg-gray-100 hover:bg-gray-300 transition rounded-xl shadow-xl overflow-hidden">
              {movie.image && (
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-52 object-cover"/>
              )}
              <div className="p-3">
                <h3 className="text-lg font-semibold text-black truncate">{movie.name}</h3>
                <p className="text-sm text-gray-900 line-clamp-2">{movie.description}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-50">
                  <span className="px-2 py-1 bg-gray-800 rounded-full">{movie.genre}</span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full"> {movie.language}</span>
                  <span className="px-2 py-1 bg-gray-800 rounded-full">{movie.duration}</span>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(index);
                    }}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">
                    <BiSolidPencil />
                  </button>

                  <button onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                    className="p-2 bg-red-700 hover:bg-red-900 text-white rounded-md text-sm">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
