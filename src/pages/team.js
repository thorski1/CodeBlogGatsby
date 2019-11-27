import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Button, Card, CardText, CardBody, CardTitle, Row } from "reactstrap"
import SamImage from '../images/profilePic.jpg'
import VaughnaImage from '../images/MommyKaija.jpg'
import authors from '../util/authors'
import { slugify } from '../util/utilityFunctions'

const TeamPage = () => (
  <Layout pageTitle="Our Team">
    <SEO title="Team" />
    <Row className="mb-4">
      <div className="col-md-3">
        <img src={SamImage} style={{maxWidth: "100%" }} alt="Sam's Profile"/>
      </div>
      <div className="col-md-8">
        <Card style={{ minHeight: "100%" }}>
          <CardBody>
            <CardTitle>
              {authors[0].name}
            </CardTitle>
            <CardText>
              {authors[0].bio}
            </CardText>
            <Button className
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
