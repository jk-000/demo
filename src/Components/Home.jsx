import React, { useEffect, useState, useRef } from "react";
import "./Card.css"; 
import "aos/dist/aos.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import SkeletonLoader from "./Skeleton/SkeletonLoader";
import SearchBar from "./SearchBar/Search";
import Button from "./Button/Button";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./redux/moviesSlice";
import LoadingBar from "react-top-loading-bar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const moviesPerPage = 20;

  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber, 10) || 1;

  const dispatch = useDispatch();
  const { items: movies, status } = useSelector((state) => state.movies);

  const loadingBarRef = useRef(null);

  useEffect(() => {
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }

    if (status === null) {
      dispatch(fetchMovies()).then(() => {
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      });
    } else {
      if (loadingBarRef.current) {
        loadingBarRef.current.complete();
      }
    }
  }, [status, dispatch]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMovies = filteredMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfFirstMovie + moviesPerPage
  );

  const handlePageChange = (page) => {
    navigate(`/page/${page}`);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    handlePageChange(1);
  };

  // Dynamic SEO content
  const seoTitle =
    currentPage === 1
      ? "JKHub Movies | Free Download Movies & Web Series"
      : `Movies Page ${currentPage} | JKHub Movies | Free Download`;

  const seoDescription =
    currentPage === 1
      ? "Download latest movies and web series from JKHub Movies, including Bollywood, Hollywood, and Hindi Dubbed series."
      : `Page ${currentPage} of the latest movies and web series available for download on JKHub Movies.`;

  return (
    <div className="home-container">
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <Button />
      <div className="search-bar">
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <h1>
        {currentPage === 1 ? "Latest Releases 🔥" : `Page: ${currentPage}`}
      </h1>
      
      {/* Dynamic Helmet SEO Tags */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://jkhub.site/page/${currentPage}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://jkhub.site/page/${currentPage}`} />
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

export default Home;
