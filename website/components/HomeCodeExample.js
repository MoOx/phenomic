import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

import Editor from "./Editor";
import Spacer from "./Spacer";

const CodeExample = () => (
  <View>
    <View style={styles.row}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{"1"}</Text>
          </View>
          <View style={styles.itemLabel}>
            <Text style={styles.itemTitle}>{"Get your content"}</Text>
            <Text style={styles.itemSubTitle}>
              {"Markdown, JSON... From fs, REST, GraphQL APIs..."}
            </Text>
          </View>
        </View>
        <Editor header={"content/index.md"}>{`---
date: 2017-05-23
title: Helloworld!
---

## Welcome!

This is an article`}</Editor>
      </View>
      <Spacer />
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{"2"}</Text>
          </View>
          <View style={styles.itemLabel}>
            <Text style={styles.itemTitle}>{"Write your templates"}</Text>
            <Text style={styles.itemSubTitle}>
              {"Choose your renderer (React, Vue, Handlebars...)"}
            </Text>
          </View>
        </View>
        <Editor header={"src/Article.js"}>{`const Article = props =>
<div>
  <h2>
    {props.title}
  </h2>
  <BodyRenderer
    body={props.body}
  />
</div>`}</Editor>
      </View>
      <Spacer />
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{"3"}</Text>
          </View>
          <View style={styles.itemLabel}>
            <Text style={styles.itemTitle}>{"Compile your website"}</Text>
            <Text style={styles.itemSubTitle}>
              {"Deploy it on any static hosting service"}
            </Text>
          </View>
        </View>
        <Editor header={"$ ~"}>{`$ phenomic build
✔ Collecting content
✔ Building server app
✔ Generating files
✔ Building client app
Done!
$ # Deploy`}</Editor>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: "row"
  },
  item: {
    flexGrow: 1
  },
  itemHeader: {
    flexDirection: "row",
    paddingBottom: 10
  },
  number: {
    backgroundColor: "#7a8ca3",
    borderRadius: "50%",
    width: 40
  },
  numberText: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "900",
    textAlign: "center"
  },
  itemLabel: {
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: 22,
    color: "#7a8ca3"
  },
  itemSubTitle: {
    fontSize: 14,
    fontWeight: "200",
    color: "#6f84a1"
  }
});

export default CodeExample;
