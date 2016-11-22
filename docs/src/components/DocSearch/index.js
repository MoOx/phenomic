import React, { Component } from "react"
import Helmet from "react-helmet"
import { browserHistory } from "phenomic/lib/client"

import "./index.global.css"
import MagnifierSVG from "./magnifier.svg"

export default class DocSearch extends Component {
  componentDidMount() {
    const d = document.createElement("script")
    d.async = true
    d.src = "https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js"
    d.onload = () => {
      window.docsearch({
        apiKey: "b2c000051691f7e68bf3e54e09c2db38",
        indexName: "phenomic",
        inputSelector: "#algolia-docsearch",
        openOnFocus: true,
        handleSelected:  function(input, event, suggestion) {
          browserHistory.push(
            suggestion.url.replace("https://phenomic.io", "")
          )
        },
        // for styling
        // debug: true,
      })
    }
    document.getElementsByTagName("body")[0].appendChild(d)
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <span>
        <Helmet
          link={ [ {
            "rel": "stylesheet",
            "href": "https://cdn.jsdelivr.net/docsearch.js/2/docsearch.min.css",
          } ] }
        />
        <style>{ `
          #algolia-docsearch {
            background:
              #eee
              url(data:image/svg+xml;utf8,${
                encodeURIComponent(MagnifierSVG)
              })
              12px 50% / 14px 14px no-repeat;
            padding-left: 2rem !important;
          }
        `}</style>
        <input
          id="algolia-docsearch"
          placeholder="Search..."
        />
      </span>
    )
  }
}
