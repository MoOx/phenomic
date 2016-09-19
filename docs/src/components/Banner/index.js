import React, { PropTypes } from "react"
import cx from "classnames"

import ContentWrapper from "../ContentWrapper"
import GradientLine from "../GradientLine"

import styles from "./index.css"

const Banner = (props) => (
  <div>
    <GradientLine height={ 1 } />
    <div
      className={ cx({
        [styles.container]: true,
        [styles.big]: props.big,
        [styles.small]: props.small,
        [styles.tiny]: props.tiny,
      }) }
    >
      <ContentWrapper>
        { props.children }
      </ContentWrapper>
    </div>
    <GradientLine height={ 1 } />
  </div>
)

Banner.propTypes = {
  children: PropTypes.node,
  big: PropTypes.bool,
  small: PropTypes.bool,
  tiny: PropTypes.bool,
}

export default Banner
