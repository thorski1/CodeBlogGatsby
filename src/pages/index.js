import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMM Do YYYY")
              author
              tags
              image {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark
  const postsPerPage = 2
  let numberOfPages = Math.ceil(
    data.allMarkdownRemark.totalCount / postsPerPage
  )
  return (
    <Layout pageTitle="CodeBlog">
      <SEO title="Home" />
      <div>
        {edges.map(({ node }) => {
          const { title, author, date, tags } = node.frontmatter
          const { excerpt, id } = node
          const { fluid } = node.frontmatter.image.childImageSharp
          return (
            <Post
              key={id}
              title={title}
              author={author}
              slug={node.fields.slug}
              date={date}
              body={excerpt}
              fluid={fluid}
              tags={tags}
            />
          )
        })}
        <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
      </div>
    </Layout>
  )
}

export default IndexPage
