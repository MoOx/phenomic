import React, { Component } from "react"
import { PropTypes } from "react"

// react-router does not return leading and trailing slashes
// so we need to normalize according to collection data
import urlify from "../_utils/urlify"
function splatToUrl(string) {
  return "/" + urlify(string)
}

const isDevelopment = process.env.NODE_ENV !== "production"
const isClient = typeof window !== "undefined"
const isDevelopmentClient = isDevelopment && isClient

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

    const pageUrl = splatToUrl(props.params.splat)
    if (isDevelopmentClient) {
      console.info(`statinamic: PageContainer: '${ pageUrl }' rendering...`)
    }
    const page = props.pages[pageUrl]
    if (!page) {
      const item = context.collection.find(
        (item) => (
          item.__url === pageUrl ||
          item.__resourceUrl === pageUrl
        )
      )
      if (item) {
        props.getPage(pageUrl, item.__dataUrl)
      }
      else {
        props.setPageNotFound(pageUrl)
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
    const pageUrl = splatToUrl(this.props.params.splat)
    const page = this.props.pages[pageUrl]

    if (!page) {
      if (isDevelopmentClient) {
        console.info(`statinamic: PageContainer: '${ pageUrl }' no data`)
      }
      return null
    }
    if (isDevelopmentClient) {
      console.info(`statinamic: PageContainer: '${ pageUrl }'`, page)
    }

    if (typeof page !== "object") {
      console.info(
        `statinamic: PageContainer: page ${ pageUrl } should be an object`
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
