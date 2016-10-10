import React from "react"
import Helmet from "react-helmet"
import TopBarProgressIndicator from "react-topbar-progress-indicator"

import Banner from "../../components/Banner"

import styles from "./index.css"

TopBarProgressIndicator.config({
  barColors: {
    "0": "#006bf6",
    "1.0": "#10e951",
  },
  shadowBlur: 5,
})

const PageLoading = () => (
  <div>
    <Helmet
      title={ "Loading..." }
    />
    <TopBarProgressIndicator />
    <Banner small>
      <h1>{ " " }</h1>
    </Banner>
    <div className={ styles.loader }>
      <div className={ styles.spinner } />
    </div>
  </div>
)

export default PageLoading
