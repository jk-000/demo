import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Movieinfo.css";
import SearchBar from "../SearchBar/Search";
import { Helmet } from "react-helmet";
import LoadingBar from "react-top-loading-bar";
import API_BASE_URL from "../../config"; // Import the configuration file

const MovieInfo = () => {
  const [setSearchTerm] = useState("");
  const { title } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const loadingBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (loadingBarRef.current) {
        loadingBarRef.current.continuousStart();
      }
      try {
        const response = await fetch(`${API_BASE_URL}${title}`);
        const movieData = await response.json();
        setMovie(movieData);
        scrollToTop(); // Scroll to the top of the page when data is loaded
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
        if (loadingBarRef.current) {
          loadingBarRef.current.complete();
        }
      }
    };

    fetchData();
  }, [title]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  const images = movie?.screenshots?.map((screenshot, index) => (
    <img
      key={index}
      src={screenshot}
      alt={`Screenshot ${index + 1}`}
      className="screenshots"
    />
  ));

  const isWebSeries = movie?.type === "series";

  const handlePageChange = (page) => {
    navigate(`/page/${page}`);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    handlePageChange(1);
  };

  return (
    <div className="movie-info-container">
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <Helmet>
        <title>{movie?.title}</title>
        <meta name="description" content={`Download ${movie?.movieName} in 1080p, 4K, UHD, 60FPS quality. Featuring stars: ${movie?.stars?.join(", ")}.`} />
        <meta name="keywords" content={`Download ${movie?.movieName}, ${movie?.genres?.join(", ")}, ${movie?.director}, ${movie?.rating}`} />
        <link rel="canonical" href={`${window.location.origin}/movies/${title}`} />
        
        {/* Open Graph for social sharing */}
        <meta property="og:title" content={movie?.movieName} />
        <meta property="og:description" content={`Watch or download ${movie?.movieName} - Directed by ${movie?.director}, starring ${movie?.stars?.join(", ")}.`} />
        <meta property="og:image" content={movie?.image} />
        <meta property="og:url" content={`${window.location.origin}/movies/${title}`} />
        <meta property="og:type" content="video.movie" />

        {/* Twitter Cards for better Twitter integration */}
        <meta name="twitter:title" content={movie?.movieName} />
        <meta name="twitter:description" content={`Download ${movie?.movieName} in HD quality.`} />
        <meta name="twitter:image" content={movie?.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>   

      <div className="main-card">
        {movie?.title && <h1 className="heading-h">{movie.title}</h1>}
        {movie?.image && (
          <img className="card-image" src={movie.image} alt={movie.title} />
        )}
        <hr className="main-hr" />
        {movie?.movieName && <h2 className="movie-h2">{movie.movieName}</h2>}
        {movie?.rating && (
          <p className="rating">
            <b>iMDB Rating:</b> <span> {movie.rating}/10 </span>
          </p>
        )}
        {movie?.genres?.length > 0 && (
          <p className="genres">
            <b>Genres:</b> {movie.genres.join(", ")}
          </p>
        )}
        {movie?.stars?.length > 0 && (
          <p className="star">
            <b>Stars:</b> {movie.stars.join(", ")}
          </p>
        )}
        {movie?.director && (
          <p className="creator">
            <b>Creator:</b> {movie.director}
          </p>
        )}
        {movie?.language && (
          <p className="lan">
            <b>Language:</b> {movie.language}
          </p>
        )}
        {movie?.quality && (
          <p className="quality">
            <b>Quality:</b> {movie.quality}
          </p>
        )}
        <hr className="main-hr" />

        <p className="screen">Screen-Shots</p>
        <div className="grid-container">{images}</div>

        <hr className="main-hr" />
        <p className="link">DOWNLOAD LINKS</p>
        <hr className="notmain-hr" />
        <div className="links">
          {movie?.download?.map((item, index) => (
            <React.Fragment key={index}>
              <p>
                <a href={item[1]} target="_blank" rel="noreferrer">
                  {item[0]}
                </a>
              </p>
              {index !== movie.download.length - 1 && (
                <hr className="notmain-hr" />
              )}
            </React.Fragment>
          ))}
        </div>
        <hr className="main-hr" />
        {isWebSeries && movie?.singlelink?.length > 0 && (
          <React.Fragment>
            <p className="single-link">Single Episode Links</p>
            <hr className="notmain-hr" />
            <div className="links">
              {movie.singlelink.map((link, index) => (
                <p key={index} className="single-link-item">
                  EPISODE {index + 1} -{" "}
                  <a href={link} target="_blank" rel="noreferrer">
                    Download
                  </a>
                </p>
              ))}
            </div>
            <hr className="main-hr" />
          </React.Fragment>
        )}
        {movie?.trailer && (
          <iframe
            width="560"
            height="315"
            src={movie.trailer}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        )}

        <p className="descr">
          Here you can download 1080p x264 UHD, 1080p 60FPS, 1080p x265 10Bit,
          4k HDR, 4k 2160p SDR & 3D Movies through Google Drive Links.
          High-quality movies with the best quality options and maximum
          bitrates. We also focus on providing the best quality audio available.
          4k HEVC Dolby Atmos is one of the best High-quality formats with low
          file sizes. We provide a fast & safe direct google drive link to
          download the best quality stuff from the best Encoders. You can easily
          clone our files into your G-Drive and make your own collection of
          high-quality movies. Google Drive Direct/Login to download/Make Clone
          option are the best way to download or make a copy in your google
          drive. <br /> <br /> <span> Note:</span> We Do not host any files on
          our server. All files shared here are collected from the internet from
          various Encoders and hosted on third-party sites. We do not accept
          responsibility for content hosted on third-party websites. We just
          index those links which are already available on the internet.
        </p>
      </div>

      <div className="search-bar-container">
        <div className="search-bar1">
          <SearchBar onSearch={handleSearchChange} />
        </div>
        <div className="button-container">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
