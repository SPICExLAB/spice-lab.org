import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import pdfIcon from '../images/pdf.png';
import citationIcon from '../images/citation.png';
import bibtexIcon from '../images/bibtex.png';
import awardIcon from '../images/medal.png';

const PublicationCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 32px; // Increase margin to create more space between cards

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CoverImageContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 100px;

  @media (max-width: 767px) {
    width: 100%;
    min-height: 200px;
    flex: none;
  }
`;

const CoverImageWrapper = styled(Link)`
  position: relative;
  overflow: hidden;
  flex: 1;
`;

const CoverImage = styled(GatsbyImage)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateY(-50%);
`;

const PublicationInfo = styled.div`
  flex: 3 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;

  h3 {
    margin-top: 0;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const Authors = styled.p`
  margin-bottom: 0;
`;

const Conference = styled.p`
  font-style: italic;
  margin-top: 8px;
  margin-bottom: 0;
  color: rgb(96, 96, 96);
`;

const ToBePublished = styled.span`
  color: #8954a8;
  font-weight: bold;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AuthorLink = styled.a`
  color: inherit;
`;

const PublicationLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;

  .iconLink,
  .iconButton {
    display: flex;
    align-items: center;
    margin-right: 8px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }

  .iconLink span,
  .iconButton span {
    margin-left: 4px;
    font-size: 14px;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const Award = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: red;
  margin-right: 8px;

  img {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow: auto;

  h4 {
    margin-top: 0;
  }

  &.bibtexModalContent {
    width: 90%;
    max-width: 800px;
  }
`;

const ModalText = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 8px;
  box-sizing: border-box;
`;

const ModalCode = styled.pre`
  white-space: pre;
  word-wrap: normal;
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  overflow: auto;

  code {
    font-family: monospace;
  }
`;

const PublicationCard = ({ publication, teamMembers, slug }) => {
  const {
    title,
    subtitle,
    authors,
    coverImage,
    published,
    award,
    pdfLink,
    conference,
    citation,
    bibtex,
  } = publication.frontmatter;

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
    <PublicationCardWrapper>
      <CoverImageContainer>
        {published === 'yes' ? (
          <CoverImageWrapper to={`${slug}`}>
            {coverImage && (
              <CoverImage image={getImage(coverImage)} alt={title} />
            )}
          </CoverImageWrapper>
        ) : (
          <CoverImageWrapper as="div">
            {coverImage && (
              <CoverImage image={getImage(coverImage)} alt={title} />
            )}
          </CoverImageWrapper>
        )}
      </CoverImageContainer>
      <PublicationInfo>
        <h3>
          {published === 'yes' ? (
            <Title to={`${slug}`}>{`${title}: ${subtitle}`}</Title>
          ) : (
            <span>{`${title}: ${subtitle}`}</span>
          )}
        </h3>
        <Authors>
          {authors.map((author, index) => {
            const teamMember = teamMembers[author];
            const website = teamMember ? teamMember.website : null;
            return (
              <React.Fragment key={author}>
                {index > 0 && ', '}{' '}
                {website ? (
                  <AuthorLink
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {author}
                  </AuthorLink>
                ) : (
                  <span>{author}</span>
                )}
              </React.Fragment>
            );
          })}
        </Authors>
        <Conference>
          {conference &&
            (published === 'yes' ? (
              conference
            ) : (
              <span>
                <ToBePublished>To appear in</ToBePublished> {conference}
              </span>
            ))}
        </Conference>
        {published === 'yes' && (
          <PublicationLinks>
            {pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="iconLink"
              >
                <img src={pdfIcon} alt="PDF" />
                <span>PDF</span>
              </a>
            )}
            {citation && (
              <button
                className="iconButton"
                onClick={() => openModal(citation, 'Citation')}
              >
                <img src={citationIcon} alt="Citation" />
                <span>Citation</span>
              </button>
            )}
            {bibtex && (
              <button
                className="iconButton"
                onClick={() => openModal(bibtex, 'BibTeX')}
              >
                <img src={bibtexIcon} alt="BibTeX" />
                <span>BibTeX</span>
              </button>
            )}
            {award && (
              <Award>
                <img src={awardIcon} alt="Award" />
                {award}
              </Award>
            )}
          </PublicationLinks>
        )}
        {modalContent && (
          <Modal onClick={closeModal}>
            <ModalContent
              className={modalTitle === 'BibTeX' ? 'bibtexModalContent' : ''}
              ref={modalRef}
            >
              <h4>{modalTitle}</h4>
              {modalTitle === 'Citation' ? (
                <ModalText
                  value={modalContent}
                  readOnly
                  onClick={(event) => event.stopPropagation()}
                />
              ) : (
                <ModalCode>
                  <code>{modalContent}</code>
                </ModalCode>
              )}
            </ModalContent>
          </Modal>
        )}
      </PublicationInfo>
    </PublicationCardWrapper>
  );
};

export default PublicationCard;
