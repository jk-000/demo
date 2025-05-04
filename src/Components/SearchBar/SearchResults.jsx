import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/Search";
import Button from "../Button/Button";
import API_BASE_URL from "../../config"; // Ensure correct import path
import "../Card.css";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const normalizeSearchTerm = (term) => {
  return term.trim().toLowerCase().replace(/\s+/g, " ");
};

const SearchResults = () => {
  const [setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();
  const searchTerm = query.get("query");
  const navigate = useNavigate();
  const currentPage = parseInt(query.get("page"), 10) || 1;
  const moviesPerPage = 16;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
        const response = await fetch(
          `${API_BASE_URL}?search=${normalizedSearchTerm}`
        );

        if (response.ok) {
          const responseData = await response.json();
          if (Array.isArray(responseData.Movies)) {
            const simplifiedMovies = responseData.Movies.map((movie) => ({
              id: movie._id,
              title: movie.title,
              movieName: movie.movieName,
              image: movie.image,
              genres: movie.genres.join(", "),
              stars: movie.stars.join(", "),
              language: movie.language,
              type: movie.type,
              date: movie.date,
            }));
            // Sort movies by date in descending order
            const sortedMovies = simplifiedMovies.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setMovies(sortedMovies);
          } else {
            console.error("Invalid data format: Movies array not found");
          }
        } else {
          console.error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    navigate(`/search?query=${searchTerm}&page=${page}`);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    handlePageChange(1);
  };


  return (
    <div className="bg">
      <Button/>
      <div className="search-bar" style={{ paddingTop: '20px' }}>
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <h1>Search Results for "{searchTerm}"</h1>
      <div className="home-container">
        <div className="movies-container">
          {isLoading ? (
            <SkeletonLoader />
          ) : movies.length > 0 ? (
            currentMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.title}`}
                className="movie-link"
              >
                <div className="movie-card">
                  <div className="movie-image">
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <div className="movie-title">
                    <p>{movie.title}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>
              <img
                src="../404.png"
                alt="404 Not Found!"
                style={{ width: "300px" }}
              />
            </p>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchResults;
