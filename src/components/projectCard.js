import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from '../components/projectCard.module.css';
const ProjectCard = ({ frontmatter, heroImage, slug }) => {
  const { title, subtitle, published } = frontmatter;

  return (
    <div className={styles.projectCard}>
      {published === 'yes' ? (
        <Link to={`${slug}`}>
          <div className={styles.projectImageWrapper}>
            {heroImage && (
              <GatsbyImage
                image={getImage(heroImage)}
                alt={title}
                className={styles.projectImage}
              />
            )}
            {/* Conditionally render overlay only when not published */}
            {published !== 'yes' && (
              <div className={styles.projectOverlayTop}>
                <p className={styles.comingSoonOverlay}>Coming Soon!</p>
              </div>
            )}
            <div className={styles.projectOverlayBottom}>
              <p className={styles.projectSubtitle}>{subtitle}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.projectImageWrapper}>
          {heroImage && (
            <GatsbyImage
              image={getImage(heroImage)}
              alt={title}
              className={styles.projectImage}
            />
          )}
          <div className={styles.projectOverlayTop}>
            <p className={styles.comingSoonOverlay}>Coming Soon!</p>
          </div>
          <div className={styles.projectOverlayBottom}>
            <p className={styles.projectSubtitle}>{subtitle}</p>
          </div>
        </div>
      )}
      <h2 className={styles.projectTitle}>{title}</h2>
    </div>
  );
};

export default ProjectCard;
