import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const ProjectCardWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: visible;
`;

const ProjectTitle = styled.h2`
  margin: 20px;
  font-size: 1.1rem;
  text-align: center;
  color: #5a5a5a;
  transition: color 0.3s ease;

  &:hover {
    color: #4e2a84;
  }
`;

const ProjectTitleLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
`;

const StyledGatsbyImage = styled(GatsbyImage)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.$show ? 'block' : 'none')};
  z-index: 1;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ProjectOverlayBottom = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 0;
  z-index: 2;

  ${ProjectImageWrapper}:hover & {
    display: flex;
  }
`;

const ProjectSubtitle = styled.p`
  padding: 0 1rem;
  font-size: 0.9rem;
  color: #fff;
  text-align: left;
  margin: 0;
`;

const ProjectOverlayTop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 40px;
  background-color: rgba(78, 42, 132, 0.8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 2;
`;

const ComingSoonOverlay = styled.p`
  width: 100%;
  text-align: center;
  font-size: 18px;
  margin: 0;
`;

const ProjectCard = ({ frontmatter, heroImage, slug }) => {
  const { title, subtitle, published, previewLink } = frontmatter;
  const [showVideo, setShowVideo] = useState(false);
  const iframeRef = useRef(null);

  const handleMouseEnter = () => {
    if (previewLink) {
      //setShowVideo(true);
    }
  };

  const handleMouseLeave = () => {
    //setShowVideo(false);
  };

  useEffect(() => {
    if (showVideo && iframeRef.current) {
      // Play the video
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    } else if (iframeRef.current) {
      // Stop the video
      iframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        '*'
      );
    }
  }, [showVideo]);

  const getEmbedLink = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    } else {
      return url;
    }
  };

  const renderProjectContent = () => (
    <ProjectImageWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {heroImage && (
        <StyledGatsbyImage image={getImage(heroImage)} alt={title} />
      )}
      {previewLink && (
        <VideoOverlay $show={showVideo}>
          <iframe
            ref={iframeRef}
            src={`${getEmbedLink(
              previewLink
            )}?enablejsapi=1&autoplay=0&controls=0&modestbranding=1`}
            title={title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </VideoOverlay>
      )}
      {subtitle && (
        <ProjectOverlayBottom>
          <ProjectSubtitle>{subtitle}</ProjectSubtitle>
        </ProjectOverlayBottom>
      )}
    </ProjectImageWrapper>
  );

  return (
    <ProjectCardWrapper>
      {published === 'yes' ? (
        <>
          <Link to={`${slug}`}>{renderProjectContent()}</Link>
          <ProjectTitleLink to={`${slug}`}>
            <ProjectTitle>{title}</ProjectTitle>
          </ProjectTitleLink>
        </>
      ) : (
        <>
          {renderProjectContent()}
          <ProjectOverlayTop>
            <ComingSoonOverlay>Coming Soon!</ComingSoonOverlay>
          </ProjectOverlayTop>
          <ProjectTitle>{title}</ProjectTitle>
        </>
      )}
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
