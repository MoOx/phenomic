import React, { PropTypes } from "react"

import "./index.global.css"
import "./hightlightjs.global.css"

import GoogleAnalyticsTracker from "./components/GoogleAnalyticsTracker"
import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import AppCacheBanner from "./components/AppCacheBanner"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

const AppContainer = (props) => (
  <GoogleAnalyticsTracker params={ props.params }>
    <Container>
      <DefaultHeadMeta />
      <AppCacheBanner />
      <Header />
      <Content>
        { props.children }
      </Content>
      <Footer />
    </Container>
  </GoogleAnalyticsTracker>
)

AppContainer.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  params: PropTypes.object,
}

export default AppContainer
