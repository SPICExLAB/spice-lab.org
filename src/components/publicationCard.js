// src/components/PublicationCard.js
import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import * as styles from './publicationCard.module.css';
import pdfIcon from '../images/pdf.png';
import citationIcon from '../images/citation.png';
import bibtexIcon from '../images/bibtex.png';
import awardIcon from '../images/medal.png';

const PublicationCard = ({ publication, teamMembers, slug }) => {
  const {
    title,
    subtitle,
    authors,
    year,
    coverImage,
    published,
    award,
    pdfLink,
    conference,
    citation,
    bibtex,
  } = publication.frontmatter;

  // State for modal visibility and content
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const modalRef = useRef(null);

  const openModal = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
  };

  const closeModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalContent(null);
      setModalTitle('');
    }
  };

  return (
    <div className={styles.publicationCard}>
      <div className={styles.coverImageContainer}>
        {published === 'yes' ? (
          <Link to={`${slug}`} className={styles.coverImageWrapper}>
            {coverImage && (
              <GatsbyImage
                image={getImage(coverImage)}
                alt={title}
                className={styles.coverImage}
              />
            )}
          </Link>
        ) : (
          <div className={styles.coverImageWrapper}>
            {coverImage && (
              <GatsbyImage
                image={getImage(coverImage)}
                alt={title}
                className={styles.coverImage}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.publicationInfo}>
        <h3>
          {published === 'yes' ? (
            <Link to={`${slug}`} className={styles.title}>
              {`${title}: ${subtitle}`}
            </Link>
          ) : (
            <span className={styles.title}>{`${title}: ${subtitle}`}</span>
          )}
        </h3>
        <p className={styles.authors}>
          {authors.map((author, index) => {
            const teamMember = teamMembers[author];
            const website = teamMember ? teamMember.website : null;
            return (
              <React.Fragment key={author}>
                {index > 0 && ', '}{' '}
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.authorLink}
                  >
                    {author}
                  </a>
                ) : (
                  <span>{author}</span> // Renders just the name if no website is available
                )}
              </React.Fragment>
            );
          })}
        </p>
        <p className={styles.conference}>
          {conference &&
            (published === 'yes' ? (
              conference
            ) : (
              <span>
                <span className={styles.toBePublished}>To appear in</span>{' '}
                {conference}
              </span>
            ))}
        </p>
        {published === 'yes' && (
          <div className={styles.publicationLinks}>
            {pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <img src={pdfIcon} alt="PDF" />
                <span>PDF</span>
              </a>
            )}
            {citation && (
              <button
                className={styles.iconButton}
                onClick={() => openModal(citation, 'Citation')}
              >
                <img src={citationIcon} alt="Citation" />
                <span>Citation</span>
              </button>
            )}
            {bibtex && (
              <button
                className={styles.iconButton}
                onClick={() => openModal(bibtex, 'BibTeX')}
              >
                <img src={bibtexIcon} alt="BibTeX" />
                <span>BibTeX</span>
              </button>
            )}
            {award && (
              <span className={styles.award}>
                <img src={awardIcon} alt="Award" />
                {award}
              </span>
            )}
          </div>
        )}
        {modalContent && (
          <div className={styles.modal} onClick={closeModal}>
            <div
              className={`${styles.modalContent} ${
                modalTitle === 'BibTeX' ? styles.bibtexModalContent : ''
              }`}
              ref={modalRef}
            >
              <h4>{modalTitle}</h4>
              {modalTitle === 'Citation' ? (
                <textarea
                  className={styles.modalText}
                  value={modalContent}
                  readOnly
                  onClick={(event) => event.stopPropagation()}
                />
              ) : (
                <pre className={styles.modalCode}>
                  <code>{modalContent}</code>
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicationCard;
