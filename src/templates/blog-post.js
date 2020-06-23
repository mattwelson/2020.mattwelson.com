import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import components from "../utils/components"
import styled from "styled-components"
import tagColors from "../utils/tags"

import Layout from "../components/layout"
import { TagGrid, Tag } from "../styles/tags"

export default function PageTemplate({
  data: { node, site, next, previous, first },
  location,
}) {
  const siteTitle = site.siteMetadata.title
  // TODO: implement ToC?
  return (
    <MDXProvider components={components}>
      <Layout title={siteTitle}>
        <h2>{node.frontmatter.title}</h2>
        <MDXRenderer>{node.body}</MDXRenderer>

        <h3>Tags</h3>
        <TagGrid>
          {node.frontmatter.tags.map(tag => (
            <Tag key={tag} tag={tag}>
              <Link to={`/tags/${tag}`}>#{tag}</Link>
            </Tag>
          ))}
        </TagGrid>
      </Layout>
    </MDXProvider>
  )
}

export const pageQuery = graphql`
  query blogPostQuery(
    $id: String
    $next: String
    $previous: String
    $first: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    node: mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
        category
        description
      }
      id
      body
      timeToRead
    }
    next: mdx(id: { eq: $next }) {
      ...BlogCard
    }
    previous: mdx(id: { eq: $previous }) {
      ...BlogCard
    }
    first: mdx(id: { eq: $first }) {
      ...BlogCard
    }
  }
`
