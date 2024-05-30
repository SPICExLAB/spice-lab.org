import React, { useState } from 'react';
import { Link } from 'gatsby';
import logoImage from '../images/icon.png';
import * as styles from './layout.module.css';

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.layoutStyles}>
      <header className={styles.headerStyles}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoImage} alt="Logo" />
          </Link>
        </div>
        <nav
          className={`${styles.navStyles} ${isMenuOpen ? styles.active : ''}`}
        >
          <ul>
            <li>
              <Link
                to="/"
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/people"
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                People
              </Link>
            </li>
            <li>
              <Link
                to="/publications"
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                Publications
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
