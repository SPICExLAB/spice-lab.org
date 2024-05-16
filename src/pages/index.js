import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import MainLayout from '../components/MainLayout';
import ProjectCard from '../components/ProjectCard';
import NewsCard from '../components/NewsCard';
import * as styles from '../components/homePage.module.css';

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
};

const paragraphStyles = {
  marginBottom: 48,
};

const IndexPage = ({ data }) => {
  const { allMdx: projectsData } = data;
  const newsCarouselRef = useRef(null);

  // Placeholder news data
  const newsData = [
    {
      id: 1,
      title: 'News Item 1',
      date: 'May 15, 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      title: 'News Item 2',
      date: 'May 10, 2023',
      content:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 3,
      title: 'News Item 3',
      date: 'May 15, 2023',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 4,
      title: 'News Item 4',
      date: 'May 10, 2023',
      content:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    // Add more news items as needed
  ].reverse();

  const handleScrollRight = () => {
    newsCarouselRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <MainLayout>
      <h1 style={headingStyles}>Welcome to the Spice Lab Site</h1>
      <p style={paragraphStyles}>
        I am an incoming Wissner Slivka Assistant Professor in Computer Science
        at Northwestern University (Fall 2024). My research develops novel,
        practical and deployable Machine Learning and Sensing systems that aim
        to overcome challenges in high-impact application areas of extended
        reality (XR), natural user interfaces, and health sensing.
      </p>

      <h2>News</h2>
      <div className={styles.newsCarouselContainer}>
        <div className={styles.newsCarousel} ref={newsCarouselRef}>
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
        <button
          className={styles.scrollRightButton}
          onClick={handleScrollRight}
        >
          &rarr;
        </button>
      </div>

      <h2>Projects</h2>
      <div className={styles.projectGrid}>
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
      </div>
    </MainLayout>
  );
};

export const query = graphql`
  query {
    allMdx {
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
  }
`;

export default IndexPage;

export const Head = () => <title>Spice Lab Site</title>;
