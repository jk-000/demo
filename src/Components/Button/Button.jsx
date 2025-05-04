import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

const genres = [
  "Action",
  "Adult",
  "Adventure",
  "Animation",
  "Crime",
  "Thriller",
  "Documentary",
  "Comedy",
  "Family",
  "Drama",
  "Fantasy",
  "Horror",
  "History",
  "South",
  "Mystery",
  "Punjabi",
  "Romance",
  "Sci-Fi",
  "War",
];

const GenreButtons = () => {
  return (
    <div className="genre-buttons">
      <Link to="/">
        <button className="genre-button">All Movies & Series</button>
      </Link>
      <Link to="/bollywood">
        <button className="genre-button">Bollywood</button>
      </Link>
      <Link to="/hollywood">
        <button className="genre-button">Hollywood</button>
      </Link>
      <Link to="/web-series">
        <button className="genre-button">WEB-Series</button>
      </Link>
      <Link to="/k-drama">
        <button className="genre-button">Korean Movies & Series [K-Drama]</button>
      </Link>
      {genres.map((genre) => (
        <Link key={genre} to={`/category/${genre.toLowerCase()}`}>
          <button className="genre-button">{genre}</button>
        </Link>
      ))}
      
    </div>
  );
};

export default GenreButtons;
