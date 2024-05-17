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
  fontSize: 20,
  marginTop: 24,
  marginBottom: 48,
};

const IndexPage = ({ data }) => {
  const { projectsData, homepageTextData, newsData } = data;
  const newsCarouselRef = useRef(null);

  // Placeholder news data

  const handleScrollRight = () => {
    newsCarouselRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <MainLayout>
      <div
        style={paragraphStyles}
        dangerouslySetInnerHTML={{
          __html: homepageTextData.nodes[0].frontmatter.intro_paragraph,
        }}
      />

      {newsData.nodes.length > 0 && (
        <>
          <h2>News</h2>
          <div className={styles.newsCarouselContainer}>
            <div className={styles.newsCarousel} ref={newsCarouselRef}>
              {newsData.nodes.map((news) => (
                <NewsCard key={news.id} news={news.frontmatter} />
              ))}
            </div>
            {newsData.nodes.length >= 4 && (
              <button
                className={styles.scrollRightButton}
                onClick={handleScrollRight}
              >
                &rarr;
              </button>
            )}
          </div>
        </>
      )}

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
          title
          date(formatString: "MMMM DD, YYYY")
          content
        }
      }
    }
  }
`;

export default IndexPage;

export const Head = () => <title>Spice Lab Site</title>;
