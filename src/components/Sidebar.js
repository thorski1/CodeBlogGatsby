import React from "react"
import { Card, CardTitle, CardBody, Form, FormGroup, Input } from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query sidebarQuery {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              path
              image {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center">
            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
              />
            </FormGroup>
            <button className="btn btn-outline-success text-uppercase">
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase">
            Advertisement
          </CardTitle>
          <img
            src="https://via.placeholder.com/320x200"
            alt="Advert"
            style={{ width: "100%" }}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle className="text-center text-uppercase mb-3">
            Recent Posts
          </CardTitle>
          <div>
            {edges.map(({ node }) => {
              const {id} = node
              const { path, title } = node.frontmatter
              const { fluid } = node.frontmatter.image.childImageSharp
              return (
                <Card key={id}>
                  <Link to={path}>
                    <Img className="card-image-top" fluid={fluid} />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={path}>{title}</Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Sidebar
