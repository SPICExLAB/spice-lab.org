const path = require('path');
const fs = require('fs');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "project" } } }) {
        nodes {
          id
          frontmatter {
            slug
            dateAdded
            title
            subtitle
            standaloneHtml
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  const projectTemplate = path.resolve('./src/templates/projectTemplate.js');
  const standaloneTemplate = path.resolve('./src/templates/standaloneTemplate.js');

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMdx.nodes.forEach((node) => {
    const pagePath = `/projects/${node.frontmatter?.slug}`;
    if (node.frontmatter?.standaloneHtml) {
      // Hand-written page: render the HTML file next to index.mdx as-is.
      const dir = path.dirname(node.internal.contentFilePath);
      const html = fs.readFileSync(path.join(dir, node.frontmatter.standaloneHtml), 'utf8');
      const fontsFile = path.join(dir, 'fonts.txt');
      createPage({
        path: pagePath,
        component: standaloneTemplate,
        context: {
          id: node.id,
          html,
          title: node.frontmatter.title,
          description: node.frontmatter.subtitle,
          fonts: fs.existsSync(fontsFile) ? fs.readFileSync(fontsFile, 'utf8').trim() : null,
        },
      });
      return;
    }
    createPage({
      path: pagePath,
      component: `${projectTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
    console.log(node.id);
  });
};


exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
  reporter,
}) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.type === 'Mdx' && node.frontmatter) {
    // If dateAdded is not set, use the file creation date
    if (!node.frontmatter.dateAdded) {
      const stats = fs.statSync(node.internal.contentFilePath);
      createNodeField({
        node,
        name: 'dateAdded',
        value: stats.birthtime.toISOString().split('T')[0], // Format: YYYY-MM-DD
      });
    }
  }

  if (node.internal.type === 'TeamJson') {
    // Only try to process photo if it exists
    if (node.photo) {
      const photoPath = path.resolve(
        __dirname,
        'src/content/people/headshots',
        node.photo
      );

      if (fs.existsSync(photoPath)) {
        let fileNode = await createFileNodeFromBuffer({
          buffer: fs.readFileSync(photoPath),
          store,
          cache,
          createNode,
          createNodeId,
          parentNodeId: node.id,
          reporter,
        });

        if (fileNode) {
          createNodeField({
            node,
            name: 'memberImage___NODE',
            value: fileNode.id,
          });
        }
      } else {
        reporter.warn(
          `Image not found at path: ${photoPath} for member: ${node.name}`
        );
      }
    } else {
      reporter.info(`No photo specified for team member: ${node.name}`);
    }
  }
};


// `standaloneHtml` is only set on a few projects; declare it so the query above
// resolves even when no MDX file defines it.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Mdx implements Node { frontmatter: MdxFrontmatter }
    type MdxFrontmatter { standaloneHtml: String }
  `);
};
