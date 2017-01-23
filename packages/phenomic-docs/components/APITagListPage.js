import React from "react"
import { View, Text, ActivityIndicator, StyleSheet } from "react-native-web"
import { Link } from "react-router"
import Helmet from "react-helmet"
import { createContainer, query } from "phenomic-react/lib/client"

const Home = (props: Object) => (
  <View>
    {props.isLoading &&
      <ActivityIndicator />
    }
    {!props.isLoading &&
      <View style={ styles.page }>
        <Helmet title="API" />
        <Text style={ styles.title }>
          {"API Tag Reference : " + props.params.splat}
        </Text>
        {props.apis.node.list.map(api =>
          <View key={ api.id }>
            <Link to={ `/api/${ api.id }` }>
              <Text style={ styles.property }>
                {api.title}
              </Text>
            </Link>
          </View>
        )}
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
  property: {
    backgroundColor: "#fafafa",
    borderRadius: 2,
    fontFamily: "monospace",
  },
})

export default createContainer(Home, props => ({
  apis: query({
    collection: "api",
    by: "tags",
    value: props.params.splat,
  }),
}))
