import React from "react"
import { graphql, Link } from "gatsby"
import styled from 'styled-components'
import tagColors from '../utils/tags'
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"
import {Tag, TagContainer} from '../styles/tags'

export default function TagPageTemplate({
  data,
  pageContext
}) {
  const siteTitle = data.site.siteMetadata.title
  const tagCount = data.allMdx.totalCount
  const posts = data.allMdx.edges
  return (
      <Layout title={siteTitle}>
      <TagContainer>
        <h2>
        <Tag tag={pageContext.tag}>
            #{pageContext.tag}</Tag>
            </h2></TagContainer>

            <p>Showing {tagCount} posts</p>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      </Layout>
  )
}

export const pageQuery = graphql`
  query tagPageQuery(
    $tag: String
  ) {
    site {
        siteMetadata {
          title
        }
      }
    allMdx(filter: {frontmatter: {tags: {eq: $tag}}}) {
          edges {
              node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
        }
          }
          totalCount
      } 
  }
`
