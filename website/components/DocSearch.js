// @flow

import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native-web";
import Helmet from "react-helmet";
// eslint-disable-next-line
import PropTypes from "prop-types";

import IconMagnifier from "../svgs/IconMagnifier";

import Spacer from "./Spacer";

class DocSearch extends Component {
  componentDidMount() {
    const d = document.createElement("script");
    d.async = true;
    d.src =
      "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js";
    d.onload = () => {
      window.docsearch({
        // for styling
        debug: true,
        apiKey: "0bf74c99bb453ef31b325b4449823529",
        indexName: "phenomic",
        inputSelector: "#algolia-docsearch",
        openOnFocus: true,
        handleSelected: (input, event, suggestion) => {
          // rr4 || rr3
          (this.context.router.history || this.context.router).push(
            suggestion.url.replace("https://phenomic.io", "")
          );
        }
      });
    };
    document.getElementsByTagName("body")[0].appendChild(d);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Spacer style={styles.container}>
        <Helmet
          link={[
            {
              rel: "stylesheet",
              href:
                "https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
            }
          ]}
        />
        <IconMagnifier width="20" height="20" fill="#fff" />
        <style>{`
          .algolia-autocomplete { width: 100% }
        `}</style>
        <TextInput
          id="algolia-docsearch"
          placeholder="Search"
          placeholderTextColor="#fff"
          style={styles.textInput}
        />
      </Spacer>
    );
  }
}

DocSearch.contextTypes = {
  router: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 3,
    paddingHorizontal: Spacer.small,
    paddingVertical: Spacer.small / 2
  },
  textInput: {
    width: "100%",
    color: "#fff",
    paddingVertical: Spacer.small / 2,
    paddingHorizontal: Spacer.small / 2,
    marginHorizontal: Spacer.small / 2
  }
});

export default DocSearch;
