// NewsCard.js
import React from 'react';
import * as styles from './NewsCard.module.css';

const NewsCard = ({ news }) => {
  return (
    <div className={styles.newsCard}>
      <h3>{news.title}</h3>
      <p className={styles.date}>{news.date}</p>
      <p>{news.content}</p>
    </div>
  );
};

export default NewsCard;
