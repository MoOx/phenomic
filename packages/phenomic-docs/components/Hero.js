import React from "react"
import { View, Text, StyleSheet } from "react-native-web"

const Hero = () => (
  <View style={ styles.hero }>
    <View style={ styles.contents }>
      <Text style={ styles.title }>
        {"Make your website fast"}
      </Text>
      <Text style={ styles.text }>
        {"A single page application that's statically generated"}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  hero: {
    height: 400,
    backgroundColor: "#2A2A2A",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  contents: {
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "300",
    color: "#fff",
  },
})

export default Hero
