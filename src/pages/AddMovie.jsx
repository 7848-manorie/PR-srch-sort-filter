import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddMovie() {
  const navigate = useNavigate();
  const location = useLocation();

const params = new URLSearchParams(location.search);
const editIndex = params.get("edit") !== null ? parseInt(params.get("edit"), 10) : null;


  const [form, setForm] = useState({
    name: "",
    genre: "",
    language: "",
    duration: "",
    date: "",
    description: "",
    image: ""
  });

useEffect(() => {
  if (editIndex !== null && !isNaN(editIndex)) {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const movieToEdit = movies[editIndex];
    if (movieToEdit) {
      setForm(movieToEdit);
    }
  }
}, [editIndex]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    if (editIndex !== null) {
      movies[editIndex] = form;
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Movie updated successfully!");
    } else {
      movies.push(form);
      localStorage.setItem("movies", JSON.stringify(movies));
      alert("Movie added successfully!");
    }

    navigate("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 p-6 rounded-lg max-w-lg mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-black">
        {editIndex !== null ? " Update Movie" : " Add Movie"}
      </h2>

      {["name", "genre", "language", "duration", "date"].map((field) => (
        <input
          key={field}
          type={field === "date" ? "date" : "text"}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-400 text-black"
          required/>
      ))}

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded bg-gray-400 text-black"/>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded bg-gray-400 text-black"/>

      <button
        type="submit"
        className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 text-white">
        {editIndex !== null ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}
