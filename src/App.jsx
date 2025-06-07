import React, { useState, useEffect } from "react";
import "./App.css";
import serachIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=dc02011c";

const App = function () {
  const [searchItem, setSearchItem] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async function (title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search || []);
    console.log(data.Search);
  };

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="search for a movie"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
        <img
          src={serachIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchItem);
          }}
        />
      </div>
      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard movie={movie}></MovieCard>)
        ) : (
          <div className="empty">
            <h2>No Movies Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
