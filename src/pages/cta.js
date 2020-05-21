import React from "react";
import Layout from "../components/layout"
import Head from '../components/head';

import {Link, graphql, useStaticQuery} from "gatsby"
import { Container } from "react-bootstrap"

import blogStyles from "./blog.module.scss"


const CTAPage = () => {
  

  return (
    <Layout>
      <Head title="CTA"/>
      <h1>CTA</h1> 
      <p>Posts will show up here.</p>
    </Layout>
  )
}

export default CTAPage