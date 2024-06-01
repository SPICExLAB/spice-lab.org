import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const NewsCardWrapper = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 16px;
  cursor: pointer;
  background: white;
  overflow: hidden; /* Prevent content from overflowing */
  width: 300px; /* Set a fixed width for each card */
`;

const TextSection = styled.div`
  flex: 1;
  overflow: hidden; /* Prevent content from overflowing */
`;

const Date = styled.div`
  background: #eee;
  padding: 4px;
  font-size: 0.8rem;
  margin-bottom: 0;
  display: inline-block; /* Wrap background to text length */
`;

const Title = styled.h3`
  margin: 8px 0 0 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const Content = styled.div`
  color: black;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ isoverflowing }) => (isoverflowing ? 3 : 'unset')};
  line-clamp: ${({ isoverflowing }) => (isoverflowing ? 3 : 'unset')};
  max-height: 4.5em; /* Adjust based on font size and line height */
  position: relative;

  &::after {
    content: ${({ isoverflowing }) => (isoverflowing ? '"..."' : '""')};
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: white;
    padding-left: 4px;
  }
`;

const ImageSection = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const StackedImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${({ index }) => (index - 1) * 15}deg);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1)
      rotate(${({ index }) => (index - 1) * 5}deg);
    z-index: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  background: white;
  padding: 16px;
  width: 80%;
  height: auto; /* Adjust height based on content */
  max-height: 90%; /* Ensure it doesn't overflow viewport */
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  overflow: auto;
`;

const OverlayImage = styled.img`
  width: calc(50% - 4px);
  margin: 2px;
  height: auto;
`;

const OverlayImageSingle = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain; /* Maintain original aspect ratio */
`;

const OverlayText = styled.div`
  text-align: left;
`;

const OverlayDate = styled.div`
  background: #eee;
  padding: 4px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  display: inline-block; /* Wrap background to text length */
`;

const OverlayContentMarkdown = styled.div`
  color: black;
  overflow: auto;
`;

const NewsCard = ({ news }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, [contentRef.current, news.content]);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOpen(false);
  };

  const images = news.images || [];

  const overlay = (
    <Overlay onClick={handleOverlayClose}>
      <OverlayContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleOverlayClose}>&times;</CloseButton>
        {images.length > 0 && (
          <Gallery>
            {images.length === 1 ? (
              <OverlayImageSingle src={images[0].image} alt="News image" />
            ) : (
              images.map((img, index) => (
                <OverlayImage
                  key={index}
                  src={img.image}
                  alt={`News image ${index + 1}`}
                />
              ))
            )}
          </Gallery>
        )}
        <OverlayText>
          <OverlayDate>{news.date}</OverlayDate>
          <Title>{news.title}</Title>
          <OverlayContentMarkdown>
            <ReactMarkdown>{news.content}</ReactMarkdown>
          </OverlayContentMarkdown>
        </OverlayText>
      </OverlayContent>
    </Overlay>
  );

  return (
    <>
      <NewsCardWrapper onClick={handleCardClick}>
        <TextSection>
          <Date>{news.date}</Date>
          <Title>{news.title}</Title>
          <Content ref={contentRef} isoverflowing={isOverflowing.toString()}>
            <ReactMarkdown>{news.content}</ReactMarkdown>
          </Content>
        </TextSection>
        {images.length > 0 && (
          <ImageSection>
            {images.slice(0, 3).map((img, index) => (
              <StackedImage
                key={index}
                src={img.image}
                alt={`News image ${index + 1}`}
                index={index}
              />
            ))}
          </ImageSection>
        )}
      </NewsCardWrapper>
      {isOpen && ReactDOM.createPortal(overlay, document.body)}
    </>
  );
};

export default NewsCard;
