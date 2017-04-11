import React from "react"
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native-web"
import { createContainer, query } from "phenomic-preset-default/lib/client"

const ShowcaseList = (props: Object) => (
  <View>
    {props.isLoading &&
      <ActivityIndicator />
    }
    {!props.isLoading &&
      <View style={ styles.page }>
        <Text style={ styles.title }>
          {"Showcase"}
        </Text>
        <View style={ styles.list }>
          {props.showcase.node.list.map(site =>
            <TouchableOpacity style={ styles.item } key={ site.id } href={ site.url }>
              <View>
                <Image
                  source={{ uri: `/assets/showcase/${ site.media.desktop }` }}
                  style={ styles.image }
                  resizeMode="contain"
                />
                <Text style={ styles.siteName }>
                  {site.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
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
  list: {
    flexDirection: "row",
  },
  item: {
    width: "50%",
    padding: 10,
  },
  image: {
    width: 300,
    height: 200,
    maxWidth: "100%",
    minWidth: "100%",
  },
  siteName: {
    fontWeight: "700",
    fontSize: 18,
  },
})

export default createContainer(ShowcaseList, () => ({
  showcase: query({
    collection: "showcase",
  }),
}))
