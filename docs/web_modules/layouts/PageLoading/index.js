import React, { Component } from "react"
import TopBarProgressIndicator from "react-topbar-progress-indicator"

import Banner from "../../Banner"

import styles from "./index.css"

TopBarProgressIndicator.config({
  barColors: {
    "0": "#006bf6",
    "1.0": "#10e951",
  },
  shadowBlur: 5,
})

export default class PageLoading extends Component {

  render() {
    return (
      <div>
        <TopBarProgressIndicator />
        <Banner small>
          <h1>{ " " }</h1>
        </Banner>
        <div className={ styles.loader }>
          <div className={ styles.spinner }></div>
        </div>
      </div>
    )
  }
}
