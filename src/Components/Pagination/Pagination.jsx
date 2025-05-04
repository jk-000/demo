import React, { useRef } from "react";
import "./Pagination.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LoadingBar from 'react-top-loading-bar';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const loadingBarRef = useRef(null);

  const handlePageChange = (page) => {
    loadingBarRef.current.continuousStart();
    onPageChange(page);
    loadingBarRef.current.complete();
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 4;
    const visiblePages = Math.min(totalPages, maxPageNumbers);
    const halfPageNumbers = Math.floor(maxPageNumbers / 2);

    if (totalPages <= maxPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= halfPageNumbers) {
      for (let i = 1; i <= visiblePages - 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - halfPageNumbers) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - visiblePages + 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      const startPage = currentPage - halfPageNumbers + 2;
      const endPage = currentPage + halfPageNumbers - 1;
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <LoadingBar color="#ff0000" height="4px" ref={loadingBarRef} />
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="arrow"
      >
        <FiChevronLeft />
      </button>
      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => {
            if (pageNumber !== "...") handlePageChange(pageNumber);
          }}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="arrow"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
