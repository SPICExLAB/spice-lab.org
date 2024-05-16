import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './memberCard.module.css';

const MemberCard = ({ person }) => {
  const isPi = person.role === 'Principal Investigator';

  return (
    <div className={`${styles.memberCard} ${isPi ? styles.piCard : ''}`}>
      <div className={styles.memberImageWrapper}>
        <a href={person.website} target="_blank" rel="noopener noreferrer">
          {person.fields.memberImage && (
            <GatsbyImage
              image={getImage(person.fields.memberImage)}
              alt={person.name}
              className={styles.memberPhoto}
            />
          )}
        </a>
        <span className={styles.memberRole}>{person.role}</span>
      </div>
      <div className={styles.memberDetails}>
        <h3>{person.name}</h3>
        <h4>{person.program}</h4>
        <p>{person.email}</p>
      </div>
    </div>
  );
};

export default MemberCard;
