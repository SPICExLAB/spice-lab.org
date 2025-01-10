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
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);
  const projectTemplate = path.resolve('./src/templates/projectTemplate.js');

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `/projects/${node.frontmatter?.slug}`,
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

