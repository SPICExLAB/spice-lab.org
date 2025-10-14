import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import GlobalStyle from './GlobalStyle';

const LayoutWrapper = styled.div`
  color: #232129;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
  font-family: 'Avenir', sans-serif;
`;

const Main = styled.main``;

const MainLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check scroll position immediately on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <Header isScrolled={isScrolled} />
        <Main style={{ paddingTop: '8rem' }}>{children}</Main>
      </LayoutWrapper>
    </>
  );
};

export default MainLayout;
