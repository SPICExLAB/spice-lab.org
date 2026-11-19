import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import MainLayout from '../components/MainLayout';
import ProjectCard from '../components/projectCard';
import NewsCard from '../components/NewsCard';

// Structured data for Google: the site name shown above search results
// (WebSite) and the lab as an organization within Northwestern.
const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://spice-lab.org/#website',
      name: 'SPICE Lab',
      alternateName: [
        'SPICE Lab Northwestern',
        'Sensing, Perception, Interactive Computing and Experiences Lab',
      ],
      url: 'https://spice-lab.org/',
    },
    {
      '@type': 'ResearchOrganization',
      '@id': 'https://spice-lab.org/#organization',
      name: 'SPICE Lab',
      alternateName:
        'Sensing, Perception, Interactive Computing and Experiences Lab',
      url: 'https://spice-lab.org/',
      logo: 'https://spice-lab.org/lab.png',
      description: 'SPICE Lab at Northwestern University, led by Karan Ahuja, builds technologies that sense, track, and understand people for mobile health, mixed reality, and natural interfaces.',
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: 'Northwestern University',
        url: 'https://www.northwestern.edu/',
      },
      founder: {
        '@type': 'Person',
        name: 'Karan Ahuja',
        url: 'https://karan-ahuja.com/',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2233 Tech Dr, Mudd Building, Room 3546',
        addressLocality: 'Evanston',
        addressRegion: 'IL',
        postalCode: '60208',
        addressCountry: 'US',
      },
      sameAs: ['https://github.com/SPICExLAB'],
    },
  ],
};

const VisuallyHiddenH1 = styled.h1`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const MarkdownText = styled.div`
  font-weight: light;
  font-size: 1.2rem;
  line-height: 1.4;
  margin-bottom: 48px;
  @media (max-width: 768px) {
    p {
      font-size: 1rem;
      margin-bottom: 20px;
    }
  }
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
  gap: 30px;
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

  // Filter, sort by year (descending), and limit to the most recent 9 projects for home page
  const homePageProjects = projectsData.nodes
    .filter((project) => project.frontmatter.ishomePage === 'yes')
    .sort((a, b) => {
      if (b.frontmatter.year !== a.frontmatter.year) {
        return b.frontmatter.year - a.frontmatter.year;
      }
      return (
        new Date(b.frontmatter.dateAdded) - new Date(a.frontmatter.dateAdded)
      );
    })
    .slice(0, 6);

  const nonPlaceholderNews = newsData.nodes.filter(
    (news) => !news.frontmatter.isPlaceholder
  );

  return (
    <MainLayout>
      <SEO
        title="SPICE Lab – Sensing, Perception, Interactive Computing and Experiences Lab at Northwestern University"
        description="SPICE Lab at Northwestern University, led by Karan Ahuja, builds technologies that sense, track, and understand people for mobile health, mixed reality, and natural interfaces."
        pathname="/"
        jsonLd={homeJsonLd}
      />

      <VisuallyHiddenH1>
        SPICE Lab: Sensing, Perception, Interactive Computing and Experiences
        Lab at Northwestern University
      </VisuallyHiddenH1>

      <MarkdownText>
        <ReactMarkdown>
          {homepageTextData.nodes[0].frontmatter.intro_paragraph}
        </ReactMarkdown>
      </MarkdownText>

      {nonPlaceholderNews.length > 0 && (
        <>
          <h2>News</h2>
          <NewsCarouselContainer>
            <NewsCarousel ref={newsCarouselRef}>
              {nonPlaceholderNews
                .slice()
                .reverse()
                .map((news) => (
                  <NewsCard key={news.id} news={news.frontmatter} />
                ))}
            </NewsCarousel>
            {nonPlaceholderNews.length >= 4 && (
              <ScrollRightButton onClick={handleScrollRight}>
                &rarr;
              </ScrollRightButton>
            )}
          </NewsCarouselContainer>
        </>
      )}

      <h2>Selected Projects</h2>
      <ProjectGrid>
        {homePageProjects.map((project, index) => (
          <ProjectCard
            key={project.frontmatter.slug}
            frontmatter={project.frontmatter}
            heroImage={
              project.frontmatter.coverImage.childImageSharp.gatsbyImageData
            }
            slug={`/projects/${project.frontmatter.slug}`}
            index={index}
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
          year
          dateAdded
          coverImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, width: 1080)
            }
          }
          published
          ishomePage
          previewLink
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
          title
          content
          isPlaceholder
          images {
            image
          }
        }
      }
    }
  }
`;

export default IndexPage;

