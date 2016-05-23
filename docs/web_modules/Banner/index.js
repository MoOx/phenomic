import React, { Component, PropTypes } from "react"
import cx from "classnames"

import Content from "../Content"
import GradientLine from "../GradientLine"

import styles from "./index.css"

class Banner extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    big: PropTypes.boolean,
    small: PropTypes.boolean,
    tiny: PropTypes.boolean,
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
          <Content>
            { children }
          </Content>
        </div>
        <GradientLine height={ 1 } />
      </div>
    )
  }
}

export default Banner
