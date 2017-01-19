import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native-web"
import { Link } from "react-router"

import { createContainer, query } from "phenomic-react/lib/client"

import MarkdownGenerated from "./MarkdownGenerated"

const Home = (props) => (
  <View>
    <View style={ styles.page }>
      <View style={ styles.column }>
        <Text style={ styles.menuTitle }>
          {"API Reference"}
        </Text>
        {props.apis.status === "loading" &&
          <ActivityIndicator />
        }
        {props.apis.status === "idle" &&
          props.apis.node.list.map(api =>
            <View key={ api.id }>
              <Link to={ `/api/${ api.id }` }>
                <Text style={ styles.property }>
                  {api.title}
                </Text>
              </Link>
            </View>
          )
        }
        <Text style={ styles.menuTitle }>
          {"Tags"}
        </Text>
        {props.tags.status === "loading" &&
          <ActivityIndicator />
        }
        {props.tags.status === "idle" &&
          props.tags.node.list.map(tag =>
            <View key={ tag.id }>
              <Link to={ `/api/tag/${ tag.id }` }>
                <Text style={ styles.property }>
                  {tag.id}
                </Text>
              </Link>
            </View>
          )
        }
      </View>
      <View>
        <Text style={ styles.title }>{props.page.title}</Text>
        {props.page.status === "loading" &&
          <ActivityIndicator />
        }
        {props.page.status === "idle" &&
          <View>
            <Text style={ styles.title }>
              {props.page.node.title}
            </Text>
            <MarkdownGenerated
              body={ props.page.node.body }
            />
          </View>
        }
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  menuTitle: {
    fontWeight: "900",
  },
  page: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
  column: {
    width: "30%",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
  },
  property: {
    backgroundColor: "#fafafa",
    borderRadius: 2,
    fontFamily: "monospace",
  },
})

export default createContainer(Home, props => ({
  apis: query({
    collection: "api",
  }),
  tags: query({
    collection: "tags",
    by: "collection",
    value: "api",
  }),
  page: query({
    collection: "api",
    id: props.params.splat,
  }),
}))
