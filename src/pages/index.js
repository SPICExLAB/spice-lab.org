import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import ProjectCard from '../components/projectCard';
import NewsCard from '../components/NewsCard';

const MarkdownText = styled.div`
  font-weight: light;
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 48px;
`;

const NewsCarouselContainer = styled.div`
  position: relative;
  margin-bottom: 48px;
`;

const NewsCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    flex: 0 0 auto;
    width: 300px;
    margin-right: 16px;
    scroll-snap-align: start;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const ScrollRightButton = styled.button`
  position: absolute;
  top: 50%;
  right: -24px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  color: #888;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
`;

const IndexPage = ({ data }) => {
  const { projectsData, homepageTextData, newsData } = data;
  const newsCarouselRef = useRef(null);

  const handleScrollRight = () => {
    newsCarouselRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <MainLayout>
      <MarkdownText>
        <ReactMarkdown>
          {homepageTextData.nodes[0].frontmatter.intro_paragraph}
        </ReactMarkdown>
      </MarkdownText>

      {newsData.nodes.length > 0 && (
        <>
          <h2>News</h2>
          <NewsCarouselContainer>
            <NewsCarousel ref={newsCarouselRef}>
              {newsData.nodes
                .slice()
                .reverse()
                .map((news) => (
                  <NewsCard key={news.id} news={news.frontmatter} />
                ))}
            </NewsCarousel>
            {newsData.nodes.length >= 4 && (
              <ScrollRightButton onClick={handleScrollRight}>
                &rarr;
              </ScrollRightButton>
            )}
          </NewsCarouselContainer>
        </>
      )}

      <h2>Projects</h2>
      <ProjectGrid>
        {projectsData.nodes.map((project) => (
          <ProjectCard
            key={project.frontmatter.slug}
            frontmatter={project.frontmatter}
            heroImage={
              project.frontmatter.coverImage.childImageSharp.gatsbyImageData
            }
            slug={`/projects/${project.frontmatter.slug}`}
          />
        ))}
      </ProjectGrid>
    </MainLayout>
  );
};

export const query = graphql`
  query {
    projectsData: allMdx(filter: { frontmatter: { type: { eq: "project" } } }) {
      nodes {
        frontmatter {
          slug
          title
          subtitle
          coverImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 1080)
            }
          }
          published
        }
      }
    }
    homepageTextData: allMdx(
      filter: { frontmatter: { type: { eq: "settingTexts" } } }
    ) {
      nodes {
        frontmatter {
          intro_paragraph
        }
      }
    }
    newsData: allMdx(filter: { frontmatter: { type: { eq: "news" } } }) {
      nodes {
        id
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          content
          image
        }
      }
    }
  }
`;

export default IndexPage;

export const Head = () => <title>Spice Lab Site</title>;