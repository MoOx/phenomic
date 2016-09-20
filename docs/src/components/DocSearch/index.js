import React, { Component } from "react"
import "./index.global.css"
import { browserHistory } from "phenomic/lib/client"

export default class DocSearch extends Component {
  componentDidMount() {
    const d = document.createElement("script")
    d.type = "text/javascript"
    d.async = true
    d.src = "https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js"
    d.onload = () => {
      window.docsearch({
        apiKey: "b2c000051691f7e68bf3e54e09c2db38",
        indexName: "phenomic",
        inputSelector: "#algolia-docsearch",
        debug: false,
        openOnFocus: true,
        handleSelected:  function(input, event, suggestion) {
          browserHistory.push(
            suggestion.url.replace("https://phenomic.io", "")
          )
        },
      })
    }
    document.getElementsByTagName("body")[0].appendChild(d)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <input id="algolia-docsearch" />
    )
  }
}
