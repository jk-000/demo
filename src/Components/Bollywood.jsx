import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Card.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Pagination from "./Pagination/Pagination";
import SkeletonLoader from "./Skeleton/SkeletonLoader";
import SearchBar from "./SearchBar/Search";
import Button from "./Button/Button";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/moviesSlice"; // Import your fetchMovies action
import LoadingBar from "react-top-loading-bar";

const Bollywood = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const moviesPerPage = 20;

  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber, 10) || 1;

  const dispatch = useDispatch();
  const { items: movies, status } = useSelector((state) => state.movies); // Use Redux state for movies and status

  const bollywoodMovies = movies.filter(
    (movie) => movie.type.includes("bollywood") && movie.title && movie.image
  );

  const loadingBarRef = useRef(null);

  useEffect(() => {
    if (loadingBarRef.current) {
      // Start loading bar
      loadingBarRef.current.continuousStart();
    }

    const fetchMoviesData = async () => {
      try {
        if (status === null) {
          // Fetch movies if status is null
          await dispatch(fetchMovies());
        }
      } finally {
        if (loadingBarRef.current) {
          // Complete loading bar after fetching data
          loadingBarRef.current.complete();
        }
      }
    };

    fetchMoviesData();
    AOS.init();
  }, [status, dispatch]);

  const filteredMovies = bollywoodMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMovies = filteredMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handlePageChange = (page) => {
    navigate(`/bollywood/page/${page}`);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    handlePageChange(1); // Reset to the first page when search term changes
  };

  // Dynamic SEO title and description
  const seoTitle =
    currentPage === 1
      ? "JKHub Movies - Bollywood HD Movies Free Download"
      : `Page ${currentPage} | Bollywood | JKHub Movies`;

  const seoDescription =
    currentPage === 1
      ? "Download the latest Bollywood movies in HD quality. Explore a vast collection of free movies on JKHub Movies."
      : `Explore page ${currentPage} of the latest Bollywood HD movies available for free download on JKHub Movies.`;

  return (
    <div className="home-container">
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <Button />
      <div className="search-bar">
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <h1>
        {currentPage === 1 ? "Bollywood Movies 🎬" : `Page: ${currentPage}`}
      </h1>

      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link
          rel="canonical"
          href={`https://jkhub.site/bollywood/page/${currentPage}`}
        />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta
          property="og:url"
          content={`https://jkhub.site/bollywood/page/${currentPage}`}
        />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
      </Helmet>
      
      <div className="movies-container">
        {status === "loading" ? (
          <SkeletonLoader />
        ) : totalMovies > 0 ? (
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
          <p><img
          src="../404.png"
          alt="404 Not Found!"
          style={{ width: "300px" }}
        /></p>
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

export default Bollywood;
