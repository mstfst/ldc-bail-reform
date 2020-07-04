import React from 'react';

import Header from "./header"
import Footer from "./footer"

import "../styles/index.scss"
import layoutStyles from './layout.module.scss';

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const Layout = (props) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header/>
        {props.children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout