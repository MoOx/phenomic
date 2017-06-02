import React, { Component, PropTypes } from "react";
import ga from "react-google-analytics";

import Flex from "../Flex";

const GOOGLE_ANALYTICS_UA = "UA-76349880-1";
const GoogleAnalyticsInitiailizer = ga.Initializer;

const isProduction = process.env.NODE_ENV === "production";
const isClient = typeof window !== "undefined";

export default class GoogleAnalyticsTracker extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (isClient) {
      if (isProduction) {
        ga("create", GOOGLE_ANALYTICS_UA, "auto");
      } else {
        console.info("ga.create", GOOGLE_ANALYTICS_UA);
      }
      this.logPageview();
    }
  }

  componentWillReceiveProps(props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.logPageview();
    }
  }

  logPageview() {
    if (isClient) {
      if (isProduction) {
        ga("set", "page", window.location.pathname);
        ga("send", "pageview");
      } else {
        console.info("New pageview", window.location.href);
      }
    }
  }

  render() {
    return (
      <Flex>
        {this.props.children}
        <GoogleAnalyticsInitiailizer />
      </Flex>
    );
  }
}
