import React from 'react';
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear(); 

  return (
    <footer>
      <p>Copyright © {currentYear} · Created by JKHub Movies</p>
    </footer>
  );
}

export default Footer;
