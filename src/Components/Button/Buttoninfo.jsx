import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import SkeletonLoader from "../Skeleton/SkeletonLoader";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/Search";
import LoadingBar from "react-top-loading-bar";
import Button from "./Button";
import API_BASE_URL from "../../config";
import "../Card.css";
import { Helmet } from "react-helmet";

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const moviesPerPage = 20;
  const loadingBarRef = useRef(null);

  // Dynamic SEO title and description
  const seoTitle =
    currentPage === 1
      ? `${
          genre.charAt(0).toUpperCase() + genre.slice(1)
        } Movies - JKHub Movies`
      : `Page ${currentPage} | ${
          genre.charAt(0).toUpperCase() + genre.slice(1)
        } Movies | JKHub Movies`;

  const seoDescription = `Explore the latest ${genre} movies available on JKHub Movies. Download and stream top ${genre} movies in HD. Find your favorite movies sorted by the newest releases.`;

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      try {
        const response = await fetch(`${API_BASE_URL}`);
        const responseData = await response.json();
        if (Array.isArray(responseData.Movies)) {
          const filteredMovies = responseData.Movies.filter((movie) =>
            movie.genres.some((g) =>
              g.toLowerCase().includes(genre.toLowerCase())
            )
          );
          // Sort movies by date in descending order
          const sortedMovies = filteredMovies.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setMovies(sortedMovies);
        } else {
          console.error("Invalid data format: Movies array not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    };

    fetchMoviesByGenre();
  }, [genre]);

  useEffect(() => {
    const fetchMoviesByGenreAndSearch = async () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      try {
        const response = await fetch(`${API_BASE_URL}`);
        const responseData = await response.json();
        if (Array.isArray(responseData.Movies)) {
          const filteredMovies = responseData.Movies.filter(
            (movie) =>
              movie.genres.some((g) =>
                g.toLowerCase().includes(genre.toLowerCase())
              ) && movie.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          // Sort movies by date in descending order
          const sortedMovies = filteredMovies.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setMovies(sortedMovies);
        } else {
          console.error("Invalid data format: Movies array not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    };

    fetchMoviesByGenreAndSearch();
  }, [genre, searchTerm]);

  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/category/${genre}/page/${page}`);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  return (
    <div className="genre-page">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link
          rel="canonical"
          href={`https://jkhub.site/category/${genre}/page/${currentPage}`}
        />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta
          property="og:url"
          content={`https://jkhub.site/category/${genre}/page/${currentPage}`}
        />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>
      <Button />
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <div className="search-bar" style={{ paddingTop: "20px" }}>
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <h1>
        {currentPage === 1
          ? `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`
          : `Page: ${currentPage}`}
      </h1>
      <div className="movies-container">
        {isLoading ? (
          <SkeletonLoader />
        ) : movies.length > 0 ? (
          currentMovies.map((movie) => (
            <Link
              key={movie.title}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default GenrePage;
