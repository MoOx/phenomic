import React, { Component, PropTypes } from "react"

import "./index.global.css"

import Container from "./components/Container"
import DefaultHeadMeta from "./components/DefaultHeadMeta"
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"

export default class AppContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  render() {
    return (
      <Container>
        <DefaultHeadMeta />
        <Header />
        <Content>
          { this.props.children }
        </Content>
        <Footer />
      </Container>
    )
  }
}
