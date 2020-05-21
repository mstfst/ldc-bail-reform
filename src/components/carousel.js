import React from "react"
// import { Link, graphql, useStaticQuery } from "gatsby"
// import './header.module.scss'
// import headerStyles from './header.module.scss';

const clickHandler = (e) => {
  console.log(e);
}


const Carousel = ( { items } ) => {
  return (
    <div>
      <h3>a carousel</h3>
      { items.map(item => (
          <li key={item.sys.id} onClick={clickHandler}>
              {item.fields.carouselCaption["en-US"]}
          </li>
        )
      )}
    </div>
  )
}

export default Carousel;