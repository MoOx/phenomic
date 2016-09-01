import React, { Component, PropTypes } from "react"
import cx from "classnames"

import ContentWrapper from "../ContentWrapper"
import GradientLine from "../GradientLine"

import styles from "./index.css"

class Banner extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    big: PropTypes.bool,
    small: PropTypes.bool,
    tiny: PropTypes.bool,
  };

  state = {
    big: false,
  };

  render() {
    const { props } = this
    const { children } = props
    return (
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
            { children }
          </ContentWrapper>
        </div>
        <GradientLine height={ 1 } />
      </div>
    )
  }
}

export default Banner
