import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";

// : http://www.omdbapi.com/?i=tt3896198&apikey=339ee7b9
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "http://www.omdbapi.com?apikey=339ee7b9";


const App = () => {
  const [movies, setMovies] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    searchMovies("Deadpool");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };



  return (
    <div className="app">
      <h1>NetChill</h1>

      <div className="search">
        <input
          placeholder="Search Movie/Show"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
        ></input>
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
