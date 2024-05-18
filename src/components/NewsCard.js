import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import * as styles from './NewsCard.module.css';

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
    <div className={styles.overlay} onClick={handleOverlayClose}>
      <div
        className={styles.overlayContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleOverlayClose}>
          &times;
        </button>
        {images.length > 0 && images[0] && (
          <div className={styles.gallery}>
            {images.length === 1 ? (
              <img
                src={images[0]}
                alt="News image"
                className={styles.overlayImageSingle}
              />
            ) : (
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`News image ${index + 1}`}
                  className={styles.overlayImage}
                />
              ))
            )}
          </div>
        )}
        <div className={styles.overlayText}>
          <div className={styles.overlayDate}>{news.date}</div>
          <div className={styles.overlayContent}>
            <ReactMarkdown>{news.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.newsCard} onClick={handleCardClick}>
        <div className={styles.textSection}>
          <div className={styles.date}>{news.date}</div>
          <div className={styles.content}>
            <ReactMarkdown>{news.content}</ReactMarkdown>
          </div>
        </div>
        <div className={styles.imageSection}>
          {images.length > 0 && images[0] && (
            <div className={styles.imageWrapper}>
              {images.slice(0, 2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`News image ${index + 1}`}
                  className={styles.image}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isOpen && ReactDOM.createPortal(overlay, document.body)}
    </>
  );
};

export default NewsCard;
