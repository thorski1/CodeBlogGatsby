import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/Post"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMM Do YYYY")
              author
              path
            }
            excerpt
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Home Page</h1>
      <div>
        {edges.map(({ node }) => {
          const {title, author, path, date} = node.frontmatter
          const {excerpt} = node
          return (
            <Post
              title={title}
              author={author}
              path={path}
              date={date}
              body={excerpt}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
