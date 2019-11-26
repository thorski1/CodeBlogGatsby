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
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Home Page</h1>
      <div>
        <Row>
          <Col md="8">
            {edges.map(({ node }) => {
              const { title, author, path, date, tags } = node.frontmatter
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
