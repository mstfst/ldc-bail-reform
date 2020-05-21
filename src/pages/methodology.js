import React from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import { Link, graphql, useStaticQuery } from "gatsby"
import { Container, Card } from "react-bootstrap"

// import blogStyles from "./blog.module.scss"


const MethodologyPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost(
        sort:{
          fields: publishedDate,
          order:DESC
        }
      ){
        edges {
          node {
            title
            slug
            publishedDate (
              formatString: "MMMM Do, YYYY"
            )
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Head title="Methodology"/>
      <Container className="mt-4">
      <h1>Methodology</h1> 
      <p>Posts will show up heree.</p>
      { data.allContentfulBlogPost.edges.map(edge => (
        <Link key={edge.node.slug} to={ `/blog/${edge.node.slug}`}>
          <Card className="mb-2">
            <Card.Body>
              <h2>{edge.node.title}</h2>
              <p className="mb-0">{edge.node.publishedDate}</p>
            </Card.Body>
          </Card>
        </Link>
      ))}
      </Container>
    </Layout>
  )
}

export default MethodologyPage