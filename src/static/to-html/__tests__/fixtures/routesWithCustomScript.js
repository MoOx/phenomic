import React from "react"
import { Route } from "react-router"
import Helmet from "react-helmet"

const ContainerWithCustomScript = () => (
  <div>
    <Helmet
      script={ [
        { src: "http://foo.bar/baz.js" },
      ] }
    />
    <p>{ "TestContainer" }</p>
  </div>
)

export default <Route path="*" component={ ContainerWithCustomScript } />
