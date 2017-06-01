import React from "react";
import { StyleSheet, View, Text } from "react-primitives";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import BodyContainer from "../BodyContainer";
import Header from "../Header";
import Editor from "../Editor";
import Spacer from "../Spacer";

const Home = () => (
  <View>
    <Header
      headTitle={"Phenomic, a modular static-site generator"}
      title={"Modular website compiler"}
      style={styles.top}
    />
    <BodyContainer style={styles.gettingStarted}>
      <View style={styles.row}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.number}>{"1"}</Text>
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
            <Text style={styles.number}>{"2"}</Text>
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
            <Text style={styles.number}>{"3"}</Text>
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
      <View style={styles.pitch}>
        {
          "Phenomic is a static website generator on that comes back from the future. "
        }
        {
          "It allows you to turn Markdown files into a website. But that's only one feature between many. "
        }
        <br />
        {
          "It has been conceived based on experiences on all kind of static website generators. "
        }
        {
          "The big difference is that Phenomic is highly modular. Core is extremly small and everything is a plugin. "
        }
      </View>
    </BodyContainer>
  </View>
);

const styles = StyleSheet.create({
  top: {
    paddingBottom: 120
  },
  gettingStarted: {
    marginTop: -100
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  item: {
    flex: 1
  },
  itemHeader: {
    flexDirection: "row",
    paddingBottom: 10
  },
  number: {
    color: "#fff",
    backgroundColor: "rgba(0,0,0,.3)",
    borderRadius: "50%",
    width: 40,
    lineHeight: 40,
    textAlign: "center"
  },
  itemLabel: {
    paddingLeft: 10
  },
  itemTitle: {
    fontSize: 18,
    color: "#fff"
  },
  itemSubTitle: {
    fontSize: 12,
    color: "#fff"
  },
  pitch: {
    padding: 40,
    fontSize: 18,
    color: "#12171C",
    lineHeight: 26
  }
});

export default createContainer(Home);
