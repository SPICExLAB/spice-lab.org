import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import logoImage from '../images/icon.png';

const LayoutWrapper = styled.div`
  color: #232129;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  font-family: '-apple-system, Roboto, sans-serif, serif';
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const Logo = styled.div`
  img {
    height: 50px;
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
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      z-index: 999;

      ul {
        flex-direction: column;
        align-items: center;
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
  transition: color 0.2s;

  &:hover {
    color: #8954a8;
  }

  &.active {
    color: #8954a8;
    border-bottom: 2px solid #8954a8;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    padding: 1.5rem 0;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  position: relative;
  z-index: 1000;

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

const Main = styled.main`
  padding: 0 1rem;
`;

const MainLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <LayoutWrapper>
      <Header>
        <Logo>
          <Link to="/">
            <img src={logoImage} alt="Logo" />
          </Link>
        </Logo>
        <Nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/people" activeClassName="active">
                People
              </NavLink>
            </li>
            <li>
              <NavLink to="/publications" activeClassName="active">
                Publications
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>
        </Nav>
        <Hamburger className={isMenuOpen ? 'active' : ''} onClick={toggleMenu}>
          <Bar className="bar"></Bar>
          <Bar className="bar"></Bar>
          <Bar className="bar"></Bar>
        </Hamburger>
      </Header>
      <Main>{children}</Main>
    </LayoutWrapper>
  );
};

export default MainLayout;
