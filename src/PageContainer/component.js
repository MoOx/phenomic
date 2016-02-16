import React, { Component } from "react"
import { PropTypes } from "react"

function splatToUri(string) {
  return string.replace(/\/index\.html$/, "")
}

export default class PageContainer extends Component {

  static propTypes = {
    pages: PropTypes.object.isRequired,
    params: PropTypes.object,

    defaultLayout: PropTypes.string,

    // actions
    getPage: PropTypes.func.isRequired,
    setPageNotFound: PropTypes.func.isRequired,
  };

  static contextTypes = {
    collection: PropTypes.array.isRequired,
    layouts: PropTypes.object.isRequired,
  };

  static defaultProps = {
    defaultLayout: "Page",
  };

  componentWillMount() {
    this.preparePage(this.props, this.context)
  }

  componentWillReceiveProps(nextProps) {
    this.preparePage(nextProps, this.context)
  }

  preparePage(props, context) {
    if (!context.layouts[props.defaultLayout]) {
      console.error(
        "statinamic: PageContainer: " +
        `default layout "${ props.defaultLayout }" doesn't exist. ` +
        `Please check your configuration ("layouts" part). ` +
        `If you haven't defined "${ props.defaultLayout }", you should. `
      )
    }

    const pageKey = splatToUri(props.params.splat)
    if (
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined"
    ) {
      console.info(`statinamic: PageContainer: '${ pageKey }' rendering...`)
    }
    const page = props.pages[pageKey]
    if (!page) {
      const pageUrl = "/" + pageKey
      const item = context.collection.find(
        (item) => (
          item.__url === pageUrl ||
          item.__url === pageUrl + "/" ||
          item.__resourceUrl === pageUrl
        )
      )
      if (item) {
        props.getPage(pageKey, item.__dataUrl)
      }
      else {
        props.setPageNotFound(pageKey)
      }
    }
    else {
      if (page.error) {
        return
      }

      const Layout = this.getLayout(props, context, page)
      if (page.type !== undefined && !Layout) {
        console.error(
          "statinamic: PageContainer: " +
          `Unkown page type: "${ page.type }" component not available in ` +
          `"layouts" property. ` +
          `Please check the "layout" or "type" of page "${ page }" header.`
        )
      }
    }
  }

  getLayout(props, context, page) {
    return context.layouts[page.type || props.defaultLayout]
  }

  render() {
    const pageKey = splatToUri(this.props.params.splat)
    const page = this.props.pages[pageKey]

    if (!page) {
      if (process.env.NODE_ENV !== "production") {
        console.info(`statinamic: PageContainer: '${ pageKey }' no data`)
      }
      return null
    }
    if (
      process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined"
    ) {
      console.info(`statinamic: PageContainer: '${ pageKey }'`, page)
    }

    if (typeof page !== "object") {
      console.info(
        `statinamic: PageContainer: page ${ pageKey } should be an object`
      )
      return null
    }

    const { PageLoading, PageError } = this.context.layouts
    const Layout = this.getLayout(this.props, this.context, page)

    return (
      <div>
        {
          !page.error && page.loading && PageLoading &&
          <PageLoading />
        }
        {
          !!page.error && !PageError &&
          <div style={ { "text-align": "center" } }>
            <h1>{ page.error }</h1>
            <p>{ page.errorText }</p>
          </div>
        }
        {
          !!page.error && PageError &&
          <PageError { ...page } />
        }
        {
          !page.error && !page.loading && Layout &&
          <Layout { ...page } />
        }
      </div>
    )
  }
}
