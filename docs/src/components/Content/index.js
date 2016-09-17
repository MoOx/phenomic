import React, { PropTypes } from "react"

import styles from "./index.css"

const Content = (props) => (
  <div className={ styles.content }>
    { props.children }
  </div>
)

Content.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
}

export default Content
