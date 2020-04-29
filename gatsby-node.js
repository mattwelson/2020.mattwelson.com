const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions
  const { data, errors } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          next {
            id
          }
          previous {
            id
          }
          node {
            id
            fields {
              slug
            }
          }
        }
      }
      categories: allMdx {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
      tags: allMdx {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)
  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  // Create blog post pages.
  const posts = data.allMdx.edges
  // you'll call `createPage` for each result
  posts.forEach(({ node, next, previous }, index) => {
    createPage({
      // This is the slug you created before
      // (or `node.frontmatter.slug`)
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/templates/blog-post.js`),
      // You can use the values in this context in
      // our page layout component
      context: {
        id: node.id,
        next: next && next.id,
        previous: previous && previous.id,
        first: posts[0].node.id,
      },
    })
  })

  // const categories = data.categories.group
  // categories.forEach(({ fieldValue }) =>
  //   createPage({
  //     path: `category/${fieldValue}`.toLowerCase(),
  //     component: path.resolve("./src/components/posts/category-layout.js"),
  //     context: {
  //       category: fieldValue,
  //     },
  //   })
  // )

  // const tags = data.tags.group
  // tags.forEach(({ fieldValue }) =>
  //   createPage({
  //     path: `tags/${fieldValue}`.toLowerCase(),
  //     component: path.resolve("./src/components/posts/tag-layout.js"),
  //     context: {
  //       tag: fieldValue,
  //     },
  //   })
  // )
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
