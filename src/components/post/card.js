import React from "react"
import { Link, graphql } from "gatsby"

export default ({ post: { fields, frontmatter, timeToRead } }) => (
  <div>
    <Link to={fields.slug}>
      <h2>{frontmatter.title}</h2>
    </Link>
    <div>
      {frontmatter.date} - {timeToRead} min read -{" "}
      <Link to={`/category/${frontmatter.category.toLowerCase()}`}>
        {frontmatter.category}
      </Link>
    </div>
    <p>{frontmatter.description}</p>

    <Link to={fields.slug}>{frontmatter.readMore || "Read"}</Link>
  </div>
)

export const query = graphql`
  fragment BlogCard on Mdx {
    frontmatter {
      title
      date(formatString: "DD MMMM YYYY")
      tags
      category
      description
      readMore
    }
    id
    excerpt(pruneLength: 150)
    timeToRead
    fields {
      slug
    }
  }
`
