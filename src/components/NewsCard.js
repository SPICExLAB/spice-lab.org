// NewsCard.js
import React, { useState } from 'react';
import * as styles from './NewsCard.module.css';

const NewsCard = ({ news }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={styles.newsCard}
      style={{
        backgroundImage: news.image ? `url(${news.image})` : 'none',
        backgroundColor: news.image ? 'none' : 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.date}>{news.date}</div>
      <div className={styles.content}>
        {isExpanded ? news.content : news.content.substring(0, 100) + '...'}
        {news.content.length > 100 && (
          <button onClick={handleReadMore} className={styles.readMoreButton}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsCard;

