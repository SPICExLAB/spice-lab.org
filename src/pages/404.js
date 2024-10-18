import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';
import MainLayout from '../components/MainLayout';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 2rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4a4a4a;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const ConstructionIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const NotFoundPage = () => {
  return (
    <MainLayout>
      <SEO
        title="404: Page Not Found | SPICE Lab"
        description="The page you're looking for may be under construction. Navigate back to the SPICE Lab homepage."
        pathname="/404"
      />
      <NotFoundContainer>
        <ConstructionIcon role="img" aria-label="Construction Sign">
          🚧
        </ConstructionIcon>
        <Title>404: Page Not Found</Title>
        <Subtitle>
          Oops! The page you're looking for may be under construction.
        </Subtitle>
        <Message>
          As a dynamic research lab, we're always working on new and exciting
          projects. The page you're trying to reach might be part of our ongoing
          work. Please check back later or explore our other available
          resources.
        </Message>
        <StyledLink to="/">Return to Homepage</StyledLink>
      </NotFoundContainer>
    </MainLayout>
  );
};

export default NotFoundPage;

export const Head = () => (
  <title>404: Page Under Construction | SPICE Lab</title>
);
