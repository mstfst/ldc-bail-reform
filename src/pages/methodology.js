import React from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import { Link, graphql, useStaticQuery } from "gatsby"
import { Container } from "react-bootstrap"

import blogStyles from "./blog.module.scss"


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
      <Container>
      <h1>Methodology</h1> 
      <p>Posts will show up here.</p>
      <ol className={blogStyles.posts}>
        { data.allContentfulBlogPost.edges.map(edge => (
          <li key={edge} className={blogStyles.post}>
            <Link to={ `/blog/${edge.node.slug}`}>
              <h2>{edge.node.title}</h2>
              <p>{edge.node.publishedDate}</p>
            </Link>
          </li>
        ))}
      </ol>
      </Container>
    </Layout>
  )
}

export default MethodologyPage