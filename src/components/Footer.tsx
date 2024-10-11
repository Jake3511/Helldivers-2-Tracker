import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>Super Earth Command is not associated with <a href="https://www.arrowheadgamestudios.com" target="_blank" rel="noopener noreferrer">Arrowhead Game Studios</a> and Sony. Trademarks belong to their respective owner, as well as inspiration from divers.gg and the Helldivers companion app.</p>
      </div>
      <div className="footer-links">
        <a href="https://github.com/Jake3511" target="_blank" rel="noopener noreferrer">
          <img src="images/GitHub-icon-1.png" alt="GitHub" className="footer-icon"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
