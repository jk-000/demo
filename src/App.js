import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Components/store";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import Bollywood from "./Components/Bollywood";
import Hollywood from "./Components/Hollywood";
import Drama from "./Components/K-Drama";
import Series from "./Components/Web-Series";
import About from "./Components/About/About";
import Movieinfo from "./Components/Moviesdata/Movieinfo";
import Footer from "./Components/Footer/Footer";
import SearchResults from "./Components/SearchBar/SearchResults";
import GenrePage from "./Components/Button/Buttoninfo";
import Desclaimer from "./Components/DMCA/Desclaimer";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm state

  return (
    <Provider store={store}>
      <>
        <LoadingBar color="#ff0000" height="4px" />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path="/page/:pageNumber"
            element={
              <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path="/Bollywood"
            element={
              <Bollywood
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/Bollywood/page/:pageNumber"
            element={
              <Bollywood
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/Hollywood"
            element={
              <Hollywood
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/Hollywood/page/:pageNumber"
            element={
              <Hollywood
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            }
          />
          <Route
            path="/K-Drama"
            element={
              <Drama searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path="/K-Drama/page/:pageNumber"
            element={
              <Drama searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path="/Web-Series"
            element={
              <Series searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route
            path="/Web-Series/page/:pageNumber"
            element={
              <Series searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
          <Route path="/movies/:title" element={<Movieinfo />} />
          <Route path="/category/:genre" element={<GenrePage />} />
          <Route
            path="/category/:genre/page/:pageNumber"
            element={<GenrePage />}
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/search/page/:pageNumber" element={<SearchResults />} />
          <Route path="/About" element={<About />} />
          <Route path="/disclaimer" element={<Desclaimer />} />
        </Routes>
        <Footer />
      </>
    </Provider>
  );
};

export default App;
