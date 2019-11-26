import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../util/utilityFunctions"
import authors from '../util/authors'

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    file(relativePath: {eq: $imageUrl}){
      childImageSharp{
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)
  const { title, date, tags } = post
  return (
    <Layout pageTitle={title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
      <SEO title={title} />
          <Card>
            <Img
              className="card-image-top"
              fluid={post.image.childImageSharp.fluid}
            />
            <CardBody>
              <CardSubtitle>
                <span className="text-info">{date}</span> by{" "}
                <span className="text-info">{author}</span>
              </CardSubtitle>
              <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              ></div>
              <ul className="post-tags">
                {tags.map(tag => (
                  <li key={tag}>
                    <Link to={`/tag/${slugify(tag)}`}>
                      <Badge color="primary">{tag}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
    </Layout>
  )
}

export default SinglePost
