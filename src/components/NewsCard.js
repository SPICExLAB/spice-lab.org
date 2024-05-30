import React, { useState } from 'react';
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
  margin-bottom: 8px;
  display: inline-block; /* Wrap background to text length */
`;

const Content = styled.div`
  color: black; /* Change text color to black */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* Limit to 5 lines */
  line-clamp: 5;
  max-height: 7.5em; /* Adjust based on font size and line height */
  position: relative;
`;

const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px;
  background: white;
`;

const ImageSection = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  margin-bottom: 4px;
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

  const handleCardClick = () => {
    setIsOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOpen(false);
  };

  const images = news.image
    ? Array.isArray(news.image)
      ? news.image
      : [news.image]
    : [];

  const overlay = (
    <Overlay onClick={handleOverlayClose}>
      <OverlayContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleOverlayClose}>&times;</CloseButton>
        {images.length > 0 && images[0] && (
          <Gallery>
            {images.length === 1 ? (
              <OverlayImageSingle src={images[0]} alt="News image" />
            ) : (
              images.map((img, index) => (
                <OverlayImage
                  key={index}
                  src={img}
                  alt={`News image ${index + 1}`}
                />
              ))
            )}
          </Gallery>
        )}
        <OverlayText>
          <OverlayDate>{news.date}</OverlayDate>
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
          <Content>
            <ReactMarkdown>{news.content}</ReactMarkdown>
          </Content>
        </TextSection>
        <ImageSection>
          {images.length > 0 && images[0] && (
            <ImageWrapper>
              {images.slice(0, 2).map((img, index) => (
                <Image key={index} src={img} alt={`News image ${index + 1}`} />
              ))}
            </ImageWrapper>
          )}
        </ImageSection>
      </NewsCardWrapper>
      {isOpen && ReactDOM.createPortal(overlay, document.body)}
    </>
  );
};

export default NewsCard;
