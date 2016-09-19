import React, { PropTypes } from "react"

import styles from "./index.css"

const Container = (props) => (
  <div className={ styles.container }>
    { props.children }
  </div>
)

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
