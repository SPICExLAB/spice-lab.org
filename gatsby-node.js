const path = require('path');
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "project" } } }) {
        nodes {
          id
          frontmatter {
            slug
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

const fs = require('fs');
const { createFileNodeFromBuffer } = require('gatsby-source-filesystem');

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  store,
  cache,
  createNodeId,
  reporter,
}) => {
  const { createNode, createNodeField } = actions;

  if (node.internal.type === 'TeamJson') {
    const photoPath = path.resolve(
      __dirname,
      'src/content/people/headshots',
      node.photo
    );

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
  }
};
