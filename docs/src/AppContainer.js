import React, { Component, PropTypes } from "react"

import "./index.global.css"
import "./hightlightjs.global.css"

import GoogleAnalyticsTracker from "./components/GoogleAnalyticsTracker"
import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import AppCacheBanner from "./components/AppCacheBanner"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  };

  render() {
    return (
      <GoogleAnalyticsTracker params={ this.props.params }>
        <Container>
          <DefaultHeadMeta />
          <AppCacheBanner />
          <Header />
          <Content>
            { this.props.children }
          </Content>
          <Footer />
        </Container>
      </GoogleAnalyticsTracker>
    )
  }
}
