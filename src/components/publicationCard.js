import React, { useState, useRef } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import awardIcon from '../images/medal2.svg';
import pdfIcon from '../images/paper.svg';
import citationIcon from '../images/citation.svg';
import bibtexIcon from '../images/bibtex.svg';
import videoIcon from '../images/video.svg';
import codeIcon from '../images/code.svg';

const PublicationCardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 36px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const CoverImageContainer = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  min-height: 160px;
  max-height: 300px;
  position: relative;

  &:hover {
    box-shadow: ${(props) =>
      props.$published === 'yes' ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  }

  @media (max-width: 767px) {
    width: 100%;
    min-height: 300px;
    max-height: 350px;
    flex: none;
  }
`;


const CoverImageWrapper = styled(Link)`
  position: relative;
  overflow: hidden;
  flex: 1;
  cursor: ${(props) => (props.$published === 'yes' ? 'pointer' : 'default')};
`;

const CoverImageStyled = styled(GatsbyImage)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateY(-50%);
`;

const UnpublishedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(78, 42, 132, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  z-index: 1;
`;

const PublicationInfo = styled.div`
  flex: 3 1 0%;
  display: flex;
  flex-direction: column;
  width: 100%;

  h3 {
    margin-top: 0;
    color: #5a5a5a;
    font-size: 1.2rem;
    margin-bottom: 0;
  }
`;

const Authors = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Conference = styled.p`
  font-style: italic;
  margin-top: 8px;
  margin-bottom: 0;
  color: rgb(96, 96, 96);
`;

const ToBePublished = styled.span`
  color: #4e2a84;
  font-weight: bold;
`;


const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
  transition: color 0.3s, text-decoration 0.3s;

  &:hover {
    color: black;
    text-decoration: underline;
  }
`;

const AuthorLink = styled.a`
  color: inherit;
  transition: color 0.3s, text-decoration 0.3s;

  &:hover {
    color: #663299;
  }
`;

const PublicationLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;

  .iconButton,
  .awardText {
    display: flex;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 6px 10px;
    font-size: 15px;
    font-weight: 300;
    border-radius: 4px;
  }

  .iconButton {
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
    transition: background-color 0.3s, box-shadow 0.3s;

    &:hover {
      background-color: rgba(78, 42, 132, 0.2);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .awardText {
    background: #4e2a84;
  }

  .iconButton span,
  .awardText span {
    margin-left: 6px;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Award = styled.span`
  font-weight: bold;
  color: white;
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
    github,
    videoLink,
  } = publication.frontmatter;

  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const modalRef = useRef(null);

   const renderTitle = () => {
     if (subtitle) {
       return `${title}: ${subtitle}`;
     }
     return title;
   };

   const CoverImageWithOverlay = ({ image, alt, published }) => (
     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
       <CoverImageStyled image={image} alt={alt} />
       {published !== 'yes' && (
         <UnpublishedOverlay>Coming Soon</UnpublishedOverlay>
       )}
     </div>
   );

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

  // Function to find team member while ignoring special characters
  const findTeamMember = (name) => {
    const cleanName = name.replace(/[^a-zA-Z0-9]/g, '');
    return Object.entries(teamMembers).find(
      ([memberName, member]) =>
        memberName.replace(/[^a-zA-Z0-9]/g, '') === cleanName
    )?.[1];
  };

  return (
    <PublicationCardWrapper>
      <CoverImageContainer $published={published}>
        {published === 'yes' ? (
          <CoverImageWrapper to={`${slug}`} $published={published}>
            {coverImage && (
              <CoverImageWithOverlay
                image={getImage(coverImage)}
                alt={title}
                published={published}
              />
            )}
          </CoverImageWrapper>
        ) : (
          <CoverImageWrapper as="div" $published={published}>
            {coverImage && (
              <CoverImageWithOverlay
                image={getImage(coverImage)}
                alt={title}
                published={published}
              />
            )}
          </CoverImageWrapper>
        )}
      </CoverImageContainer>
      <PublicationInfo>
        <h3>
          {published === 'yes' ? (
            <Title to={`${slug}`}>{renderTitle()}</Title>
          ) : (
            <span>{renderTitle()}</span>
          )}
        </h3>
        <Authors>
          {authors.map((author, index) => {
            const teamMember = findTeamMember(author);
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
              <button
                className="iconButton"
                onClick={() => window.open(pdfLink, '_blank')}
              >
                <img src={pdfIcon} alt="PDF" />
                <span>Paper</span>
              </button>
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
            {videoLink && (
              <button
                className="iconButton"
                onClick={() => window.open(videoLink, '_blank')}
              >
                <img src={videoIcon} alt="Video" />
                <span>Video</span>
              </button>
            )}
            {github && (
              <button
                className="iconButton"
                onClick={() => window.open(github, '_blank')}
              >
                <img src={codeIcon} alt="Code" />
                <span>Code</span>
              </button>
            )}
            {award && (
              <div className="awardText">
                <img src={awardIcon} alt="Award" />
                <Award>{award}</Award>
              </div>
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
