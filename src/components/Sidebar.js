import React from "react"
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Form,
  FormGroup,
  Input,
} from "reactstrap"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram, faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Sidebar = ({ author, authorFluid }) => {
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
              image {
                childImageSharp {
                  fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const { edges } = data.allMarkdownRemark
  return (
    <div>
      {author && (
        <Card>
          <Img className="card-image-top" fluid={authorFluid} />
          <CardBody>
            <CardTitle className="text-center text-uppercase mb-3">
              {author.name}
            </CardTitle>
            <CardText>{author.bio}</CardText>
            <div className="author-social-links text-center">
              <ul>
                <li>
                  <a
                    href={author.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href={author.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href={author.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google"
                  >
                    <FontAwesomeIcon icon={faGoogle} size="lg" />
                  </a>
                </li>
                <li>
                  <a
                    href={author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
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
              const { id } = node
              const { slug } = node.fields
              const { title } = node.frontmatter
              const { fluid } = node.frontmatter.image.childImageSharp
              return (
                <Card key={id}>
                  <Link to={slug}>
                    <Img className="card-image-top" fluid={fluid} />
                  </Link>
                  <CardBody>
                    <CardTitle>
                      <Link to={slug}>{title}</Link>
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
