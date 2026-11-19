/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  pathPrefix: '/spice-lab.org',
  siteMetadata: {
    title: `SPICE Lab`,
    titleLong: `SPICE Lab – Sensing, Perception, Interactive Computing and Experiences Lab at Northwestern University`,
    siteUrl: `https://spice-lab.org`,
    description: `SPICE Lab at Northwestern University, led by Karan Ahuja, builds technologies that sense, track, and understand people for mobile health, mixed reality, and natural interfaces.`,
    defaultImage: `/lab.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/content/projects/`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SPICE Lab',
        short_name: 'SPICE Lab',
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/404/', '/404.html', '/dev-404-page/'],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1080,
              linkImagesToOriginal: true,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'team',
        path: './src/content/people/team.json',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: './src/content/settingTexts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'news',
        path: './src/content/news',
      },
      __key: 'news',
    },
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true,
      },
    },
    `gatsby-plugin-decap-cms`,
  ],
};
