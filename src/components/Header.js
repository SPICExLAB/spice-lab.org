import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logoFull from '../images/Lab_logo.png';
import logoSmall from '../images/Lab_logo_small.png';
import logoFormal from '../images/Lab_logo_formal.png';

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: ${(props) =>
    props.$isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.05)' : 'none'};
`;

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => (props.$isScrolled ? '0.5rem 1rem' : '1rem 1rem')};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  transition: all 0.3s ease-in-out;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: all 0.3s ease-in-out;

  img {
    height: ${(props) => (props.$isScrolled ? '45px' : '90px')};
    transition: all 0.3s ease-in-out;
  }
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    display: none;

    &.active {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: #fff;
      z-index: 999;
      padding-top: 80px;
      overflow-y: auto;

      ul {
        flex-direction: column;
        align-items: center;
      }

      ul li {
        margin: 20px 0;
      }
    }
  }
`;

const NavLink = styled(Link)`
  color: #333;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.2s, transform 0.2s;

  &:hover {
    color: #4e2a84;
    transform: translateY(-2px);
  }

  &.active {
    color: #4e2a84;
    border-bottom: 2px solid #4e2a84;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0.5rem 0;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  position: relative;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }

  &.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  &.active .bar:nth-child(2) {
    opacity: 0;
  }

  &.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;

const Bar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  background-color: #333;
  transition: all 0.3s ease-in-out;
`;

const MobileLogo = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    text-align: center;
    margin-bottom: 100px;

    img {
      width: 300px;
      height: 300px;
    }
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isMenuOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }
`;

const Header = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
      document.body.style.overflow = '';
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMobile) {
      document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
    }
  };

  const handleLinkClick = () => {
    if (isMobile && isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <>
      <HeaderContainer $isScrolled={isScrolled}>
        <HeaderWrapper $isScrolled={isScrolled}>
          <Logo $isScrolled={isScrolled} className="logo">
            <Link to="/">
              <img src={isScrolled ? logoSmall : logoFull} alt="Logo" />
            </Link>
          </Logo>
          <Nav className={isMenuOpen ? 'active' : ''}>
            <MobileLogo>
              <img src={logoFormal} alt="Lab Logo Formal" />
            </MobileLogo>
            <ul>
              <li>
                <NavLink
                  to="/"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  TEAM
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/publications"
                  activeClassName="active"
                  onClick={handleLinkClick}
                >
                  PUBLICATIONS
                </NavLink>
              </li>
              {/* Commented out Contact tab
              <li>
                <NavLink to="/contact" activeClassName="active" onClick={toggleMenu}>
                  CONTACT
                </NavLink>
              </li>
              */}
            </ul>
          </Nav>
          <Hamburger
            className={isMenuOpen ? 'active' : ''}
            onClick={toggleMenu}
          >
            <Bar className="bar"></Bar>
            <Bar className="bar"></Bar>
            <Bar className="bar"></Bar>
          </Hamburger>
        </HeaderWrapper>
      </HeaderContainer>
      <Overlay $isMenuOpen={isMenuOpen} onClick={toggleMenu} />
    </>
  );
};

export default Header;
