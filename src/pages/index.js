import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"
import Post from "../components/Post"
import Sidebar from "../components/Sidebar"
import { Row, Col } from "reactstrap"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMM Do YYYY")
              author
              tags
              path
              image {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
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
        <Row>
          <Col md="8">
            {edges.map(({ node }) => {
              const { title, author, path, date, tags } = node.frontmatter
              const { excerpt } = node
              const { fluid } = node.frontmatter.image.childImageSharp
              return (
                <Post
                  title={title}
                  author={author}
                  path={path}
                  date={date}
                  body={excerpt}
                  fluid={fluid}
                  tags={tags}
                />
              )
            })}
          </Col>
          <Col md="4">
            <Sidebar />
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default IndexPage
