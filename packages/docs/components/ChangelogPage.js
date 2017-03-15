import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native-web"
import { createContainer, query } from "phenomic-plugin-renderer-react/lib/client"

import MarkdownGenerated from "./MarkdownGenerated"

const ChangelogPage = (props: Object) => (
  <View>
    {props.isLoading &&
      <ActivityIndicator />
    }
    {!props.isLoading &&
      <View style={ styles.page }>
        <Text style={ styles.title }>{props.page.node.title}</Text>
        <MarkdownGenerated
          body={ props.page.node.body }
        />
      </View>
    }
  </View>
)

const styles = StyleSheet.create({
  page: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
  },
})

export default createContainer(ChangelogPage, props => ({
  page: query({
    collection: "changelog",
    id: props.params.splat,
  }),
}))
