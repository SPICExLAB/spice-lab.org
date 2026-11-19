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

const Video = styled.video`
  display: block;
  width: 100%;
  height: auto;
`;

// Silent looping clip that behaves like a gif but is a fraction of the size.
const MDXVideo = ({ src, alt }) => (
  <Video
    src={withPrefix(src)}
    aria-label={alt}
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
  />
);

const isVideo = (src) => /\.(mp4|webm)$/i.test(src || '');

// Media grid entry: image or looping video depending on the file type.
const MDXMedia = ({ src, alt }) =>
  isVideo(src) ? <MDXVideo src={src} alt={alt} /> : <MDXImage src={src} alt={alt} />;

const MDXComponents = {
  MediaGrid,
  MediaItem,
  MDXImage,
  MDXVideo,
};

export { MediaGrid, MediaItem, MDXImage, MDXVideo, MDXMedia };
export default MDXComponents;
