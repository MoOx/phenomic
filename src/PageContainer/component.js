// @flow
/* eslint-disable react/sort-comp */
import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"
import urlify from "../_utils/urlify"

// react-router does not return leading and trailing slashes
// so we need to normalize according to collection data
const splatToUrl = (string) => ("/" + urlify(string))

const isDevelopment = () => process.env.NODE_ENV !== "production"
const isClient = () => typeof window !== "undefined"
const isDevelopmentClient = () => isDevelopment() && isClient

let catchLinks
let browserHistory

if (isClient()) {
  catchLinks = require("../_utils/catch-links").default
  browserHistory = require("../client").browserHistory
}

function find(
  collection: StatinamicCollection,
  pageUrl: string
): Object {
  return collection.find((item) => (
    item.__url === pageUrl ||
    item.__url === pageUrl + "/"||
    item.__resourceUrl === pageUrl
  ))
}

type DefaultProps = {
  defaultLayout: string,
}
type Props = {
  pages: Object,
  params: {
    splat: string
  },
  defaultLayout: string,
  getPage: Function,
  setPageNotFound: Function,
}

type Context = {
  collection: StatinamicCollection,
  layouts: Object
}

class PageContainer extends Component<DefaultProps, Props, void> {
  _content: Element;

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

  componentDidMount() {
    this.catchInternalLink()
  }

  componentWillReceiveProps(nextProps: Props): void {
    this.preparePage(nextProps, this.context)
  }

  componentDidUpdate() {
    this.catchInternalLink()
  }

  catchInternalLink() {
    if (!isClient()) {
      return
    }

    if (this._content) {
      const layoutDOMElement = findDOMNode(this._content)
      if (layoutDOMElement) {
        catchLinks(layoutDOMElement, (href) => {
          const pageUrl = href.replace(process.env.STATINAMIC_PATHNAME, "/")
          if (!find(this.context.collection, pageUrl)) {
            return false
          }
          if (browserHistory) {
            browserHistory.push(pageUrl)
          }
          return true
        })
      }
    }
  }

  preparePage(props: Props, context: Context): void {
    if (!context.layouts[props.defaultLayout]) {
      console.error(
        "statinamic: PageContainer: " +
        `default layout "${ props.defaultLayout }" doesn't exist. ` +
        `Please check your configuration ("layouts" part). ` +
        `If you haven't defined "${ props.defaultLayout }", you should. `
      )
    }

    const pageUrl = splatToUrl(props.params.splat)
    if (isDevelopmentClient()) {
      console.info(`statinamic: PageContainer: '${ pageUrl }' rendering...`)
    }

    const item = find(context.collection, pageUrl)
    if (isClient() && item) {
      // adjust url (eg: missing trailing slash)
      const currentExactPageUrl = window.location.href
        .replace(
          (
            window.location.protocol +
            "//" +
            window.location.host +
            process.env.STATINAMIC_PATHNAME
          ),
          "/"
        )
        .replace(window.location.hash, "")

      if (currentExactPageUrl !== item.__url) {
        console.info(
          `statinamic: PageContainer: ` +
          `replacing by '${ currentExactPageUrl }' to '${ item.__url }'`
        )
        if (browserHistory) {
          browserHistory.replace(item.__url)
        }
      }
    }

    const page = props.pages[pageUrl]
    if (!page) {
      if (item) {
        props.getPage(item.__url, item.__dataUrl)
      }
      else {
        console.error(
          `statinamic: PageContainer: ` +
          `${ pageUrl } is a page not found.`
        )
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

  getLayout(props: Props, context: Context, page: Object): ReactClass {
    return context.layouts[page.type || props.defaultLayout]
  }

  render() {
    const pageUrl = splatToUrl(this.props.params.splat)
    const page = this.props.pages[pageUrl]

    if (!page) {
      if (isDevelopmentClient()) {
        console.info(`statinamic: PageContainer: '${ pageUrl }' no data`)
      }
      return null
    }
    if (isDevelopmentClient()) {
      console.info(`statinamic: PageContainer: '${ pageUrl }'`, page)
    }

    if (
      typeof page !== "object" ||
      page.toString() !== "[object Object]"
    ) {
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
          <Layout ref={ (ref) => this._content = ref } { ...page } />
        }
      </div>
    )
  }
}

export default PageContainer
