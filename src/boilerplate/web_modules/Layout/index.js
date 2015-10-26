import React, { Component } from "react"
import { PropTypes } from "react"

import styles from "./index.css"

import Header from "Header"
import Footer from "Footer"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <div className={ styles.wrapper }>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}
