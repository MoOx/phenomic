import React from "react"
import { View, Text, StyleSheet } from "react-native-web"
import { Link } from "react-router"

const Header = () => (
  <View style={ styles.header }>
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text style={ styles.text }>
        Phenomic
      </Text>
    </Link>
    <View style={ styles.nav }>
      <View style={ styles.linkContainer }>
        <Link
          style={{ textDecoration: "none", padding: 10 }}
          to="/docs/getting-started"
          activeStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <Text style={ styles.link }>
            {"Getting started"}
          </Text>
        </Link>
      </View>
      <View style={ styles.linkContainer }>
        <Link
          style={{ textDecoration: "none", padding: 10 }}
          to="/api"
          activeStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <Text style={ styles.link }>
            {"API Reference"}
          </Text>
        </Link>
      </View>
      <View style={ styles.linkContainer }>
        <Link
          style={{ textDecoration: "none", padding: 10 }}
          to="/showcase"
          activeStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <Text style={ [ styles.link, styles.linkBold ] }>
            {"Showcase"}
          </Text>
        </Link>
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#60B9A0",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Scandia",
    fontWeight: "700",
  },
  link: {
    color: "#fff",
  },
  linkBold: {
    fontWeight: "700",
  },
  linkContainer: {
    borderRadius: 2,
    overflow: "hidden",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Header
