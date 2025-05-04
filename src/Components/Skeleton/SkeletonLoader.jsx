// SkeletonLoader.jsx
import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = () => {
  return (
    <div className="skeleton-wrapper">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="skeleton"></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
