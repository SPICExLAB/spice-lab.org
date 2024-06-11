import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const ProjectCardWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const ProjectTitle = styled.h2`
  margin: 20px;
  font-size: 1.1rem;
  text-align: center;
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  flex: 1;
  min-height: 50px;
`;

const StyledGatsbyImage = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important; /* Ensure the image covers the box */
`;

const ProjectOverlayTop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
`;

const ProjectOverlayBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: none; /* Hidden by default */
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0;

  ${ProjectImageWrapper}:hover & {
    display: flex; /* Reveals on hover */
  }
`;

const ProjectSubtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #fff;
  text-align: left;
`;

const ComingSoonOverlay = styled.p`
  width: 100%; /* Ensure full width coverage */
  text-align: center; /* Center the text */
  font-size: 20px; /* Large font size for visibility */
`;

const ProjectCard = ({ frontmatter, heroImage, slug }) => {
  const { title, subtitle, published } = frontmatter;

  return (
    <ProjectCardWrapper>
      {published === 'yes' ? (
        <Link to={`${slug}`}>
          <ProjectImageWrapper>
            {heroImage && (
              <StyledGatsbyImage image={getImage(heroImage)} alt={title} />
            )}
            {subtitle && (
              <ProjectOverlayBottom>
                <ProjectSubtitle>{subtitle}</ProjectSubtitle>
              </ProjectOverlayBottom>
            )}
          </ProjectImageWrapper>
        </Link>
      ) : (
        <ProjectImageWrapper>
          {heroImage && (
            <StyledGatsbyImage image={getImage(heroImage)} alt={title} />
          )}
          <ProjectOverlayTop>
            <ComingSoonOverlay>Coming Soon!</ComingSoonOverlay>
          </ProjectOverlayTop>
          {subtitle && (
            <ProjectOverlayBottom>
              <ProjectSubtitle>{subtitle}</ProjectSubtitle>
            </ProjectOverlayBottom>
          )}
        </ProjectImageWrapper>
      )}
      <ProjectTitle>{title}</ProjectTitle>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
