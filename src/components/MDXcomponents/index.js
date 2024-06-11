import React from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby';

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MediaItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

const MDXImage = ({ src, alt }) => {
  const imagePath = withPrefix(src);
  return <Image src={imagePath} alt={alt} />;
};

const MDXComponents = {
  MediaGrid,
  MediaItem,
  MDXImage,
};

export { MediaGrid, MediaItem, MDXImage };
export default MDXComponents;
