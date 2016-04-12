// @flow
/* eslint-disable react/sort-comp */
import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"

import urlify from "../_utils/urlify"

type DefaultProps = {
  defaultLayout: string,
}

type Props = {
  pages: Object,
  params: {
    splat: string,
  },
  layouts: Object,
  defaultLayout: string,
  getPage: Function,
  setPageNotFound: Function,
  logger: Object,
}

type Context = {
  collection: PhenomicCollection,
  layouts: Object // deprecated
}

// react-router does not return leading and trailing slashes
// so we need to normalize according to collection data
const splatToUrl = (string) => ("/" + urlify(string))

const isDevelopment = (): boolean => process.env.NODE_ENV !== "production"
const isClient = (): boolean => typeof window !== "undefined"
const isDevelopmentClient = (): boolean => isDevelopment() && isClient()

let catchLinks
let browserHistory

if (isClient()) {
  catchLinks = require("../_utils/catch-links").default
  browserHistory = require("../client").browserHistory
}

function find(
  collection: PhenomicCollection,
  pageUrl: string
): Object {
  return collection.find((item) => (
    item.__url === pageUrl ||
    item.__url === pageUrl + "/"||
    item.__resourceUrl === pageUrl
  ))
}

function getBase(location: Object): string {
  return (
    location.protocol + "//" + location.host + process.env.STATINAMIC_PATHNAME
  )
}

function adjustCurrentUrl(location: Object, item: Object, props: Props): void {
  // adjust url (eg: missing trailing slash)
  const currentExactPageUrl = location.href
    .replace(getBase(location), "/")
    .replace(location.hash, "")

  if (currentExactPageUrl !== item.__url) {
    props.logger.info(
      "phenomic: PageContainer: " +
      `replacing by '${ currentExactPageUrl }' to '${ item.__url }'`
    )
    if (browserHistory) {
      browserHistory.replace(item.__url)
    }
  }
}

let layoutFromContextWarning = false
function getLayout(
  layout: string, props: Props, context: Context, warn: boolean = true
): ReactClass | void {
  if (props.layouts && props.layouts[layout]) {
    return props.layouts[layout]
  }

  if (context.layouts && context.layouts[layout]) {
    if (warn && !layoutFromContextWarning) {
      props.logger.warn(
        "phenomic: You are using a layout defined in the client and build  " +
        `scripts ('${ layout }'). \n` +
        "This method is deprecated and will be removed in the future. \n" +
        "In order to have more flexibility, you should create your own " +
        "PageContainer and provide layouts to it via a `layouts` prop. " +
        "This will allow your to have more control over components by being "+
        "more explicit. \n"+
        "Check out migration instruction in the CHANGELOG. "
      )
      layoutFromContextWarning = true
    }
    return context.layouts[layout]
  }
}

class PageContainer extends Component<DefaultProps, Props, void> {
  _content: Element;

  propTypes: Props;

  static contextTypes = {
    collection: PropTypes.arrayOf(PropTypes.object),
    layouts: PropTypes.object,
  };

  static defaultProps: DefaultProps = {
    layouts: {},
    defaultLayout: "Page",
    logger: console,
  };

  constructor(props: Props, context: Context) {
    super(props)

    if (!getLayout(props.defaultLayout, props, context)) {
      props.logger.error(
        "phenomic: PageContainer: " +
        `default layout "${ props.defaultLayout }" not provided. `
      )
    }
  }

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
    const pageUrl = splatToUrl(props.params.splat)
    if (isDevelopmentClient()) {
      props.logger.info(
        `phenomic: PageContainer: '${ pageUrl }' rendering...`
      )
    }

    const item = find(context.collection, pageUrl)
    if (isClient() && item) {
      adjustCurrentUrl(window.location, item, props)
    }

    const page = props.pages[pageUrl]
    if (!page) {
      if (item) {
        props.getPage(item.__url, item.__dataUrl)
      }
      else {
        props.logger.error(
          `phenomic: PageContainer: ${ pageUrl } is a page not found.`
        )
        props.setPageNotFound(pageUrl)
      }
    }
    else {
      if (page.error) {
        return
      }

      const Layout = getLayout(page.type, props, context)
      if (page.type !== undefined && !Layout) {
        props.logger.error(
          "phenomic: PageContainer: " +
          `Unkown page type: "${ page.type }" component not available in ` +
          "\"layouts\" property. " +
          `Please check the "layout" or "type" of page "${ page }" header.`
        )
      }
    }
  }

  saveContentRef(ref: Element) {
    this._content = ref
  }

  render() {
    const { props, context } = this

    const pageUrl = splatToUrl(props.params.splat)
    const page = props.pages[pageUrl]

    if (!page) {
      if (isDevelopmentClient()) {
        props.logger.info(`phenomic: PageContainer: '${ pageUrl }' no data`)
      }
      return null
    }
    if (isDevelopmentClient()) {
      props.logger.info(`phenomic: PageContainer: '${ pageUrl }'`, page)
    }

    if (
      typeof page !== "object" ||
      page.toString() !== "[object Object]"
    ) {
      props.logger.info(
        `phenomic: PageContainer: page ${ pageUrl } should be an object`
      )
      return null
    }

    const PageLoading = getLayout("PageLoading", props, context, false)
    const PageError = getLayout("PageError", props, context, false)
    const LayoutFallback = getLayout(props.defaultLayout, props, context, false)
    const Layout = getLayout(page.type, props, context, false) || LayoutFallback

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
          <Layout ref={ this.saveContentRef } { ...page } />
        }
      </div>
    )
  }
}

export default PageContainer
