import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navRef = useRef();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        onClick={() => {
          closeMobileMenu();
          scrollToTop();
        }}
      >
        <img className="logo" src="/logo.png" alt="logo" />
      </Link>
      <ul
        ref={navRef}
        className={isMobileMenuOpen ? "nav-links open" : "nav-links"}
      >
        <Link
          to="/"
          className="home"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>Home</li>
        </Link>
        <Link
          to="/bollywood"
          className="bollywood"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>Bollywood</li>
        </Link>
        <Link
          to="/hollywood"
          className="hollywood"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>Hollywood</li>
        </Link>
        <Link
          to="/k-drama"
          className="k-drama"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>K-Drama</li>
        </Link>
        <Link
          to="/web-series"
          className="web-series"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>Web Series</li>
        </Link>
        <Link
          to="/about"
          className="about"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>About</li>
        </Link>
        <Link
          to="/disclaimer"
          className="dmca"
          onClick={() => {
            closeMobileMenu();
            scrollToTop();
          }}
        >
          <li>DMCA</li>
        </Link>
      </ul>
      <button
        className={`nav-btn ${isMobileMenuOpen ? "nav-close-btn" : ""}`}
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;
