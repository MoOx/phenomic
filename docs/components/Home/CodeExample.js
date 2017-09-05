import * as React from "react";
import { StyleSheet, View, Text } from "react-primitives";

import Editor from "../Editor";
import Spacer from "../Spacer";

const CodeExample = () => (
  <View>
    <View style={styles.row}>
      <View style={styles.item}>
        <View style={styles.itemHeader}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{"1"}</Text>
          </View>
          <View style={styles.itemLabel}>
            <Text style={styles.itemTitle}>{"Get some content"}</Text>
            <Text style={styles.itemSubTitle}>
              {"Markdown, JSON... from fs or REST API..."}
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
              {"Choose your renderer (React, Handlebars...)"}
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
              {"And enjoy runtime free hosting"}
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
    backgroundColor: "rgba(0,0,0,.3)",
    borderRadius: "50%",
    width: 40
  },
  numberText: {
    color: "#fff",
    lineHeight: 40,
    textAlign: "center"
  },
  itemLabel: {
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: 18,
    color: "#6B6B6B"
  },
  itemSubTitle: {
    fontSize: 12,
    color: "#6B6B6B"
  }
});

export default CodeExample;
