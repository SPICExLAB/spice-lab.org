import React, { useState } from 'react';
import { Link, withPrefix } from 'gatsby';
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
          <Link to={withPrefix('/')}>
            <img src={withPrefix(logoImage)} alt="Logo" />
          </Link>
        </div>
        <nav
          className={`${styles.navStyles} ${isMenuOpen ? styles.active : ''}`}
        >
          <ul>
            <li>
              <Link
                to={withPrefix('/')}
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={withPrefix('/people')}
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                People
              </Link>
            </li>
            <li>
              <Link
                to={withPrefix('/publications')}
                className={styles.navLinkStyle}
                activeClassName={styles.activeNavLink}
              >
                Publications
              </Link>
            </li>
            <li>
              <Link
                to={withPrefix('/contact')}
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
