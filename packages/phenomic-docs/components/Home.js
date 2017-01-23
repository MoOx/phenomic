import React from "react"
import { View } from "react-native-web"
import Helmet from "react-helmet"
import { createContainer } from "phenomic-react/lib/client"

import Hero from "./Hero"

const Home = () => (
  <View>
    <Helmet
      title="Phenomic, a static-site generator"
    />
    <Hero />
  </View>
)

export default createContainer(Home)
