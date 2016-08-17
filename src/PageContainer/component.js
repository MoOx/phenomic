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
    location.protocol + "//" + location.host +
    process.env.PHENOMIC_USER_PATHNAME
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

function getLayout(
  layout: string, props: Props
): ReactClass<any> | void {
  if (props.layouts && props.layouts[layout]) {
    return props.layouts[layout]
  }
}

class PageContainer extends Component<DefaultProps, Props, void> {
  _content: HTMLElement;

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

  constructor(props: Props) {
    super(props)

    if (!getLayout(props.defaultLayout, props)) {
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
        let bodyContainers =
          Array.prototype.slice.call(
            layoutDOMElement.querySelectorAll(".phenomic-BodyContainer")
          )
        if (!bodyContainers.length) {
          bodyContainers = [ layoutDOMElement ]
        }
        catchLinks(bodyContainers, (href) => {
          const pageUrl = href.replace(process.env.PHENOMIC_USER_PATHNAME, "/")
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

      const Layout = getLayout(page.type, props)
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

  saveContentRef: Function = (ref: HTMLElement): void => {
    this._content = ref
  };

  render() {
    const { props } = this

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

    const PageLoading = getLayout("PageLoading", props)
    const PageError = getLayout("PageError", props)
    const LayoutFallback = getLayout(props.defaultLayout, props)
    const Layout = getLayout(page.type, props) || LayoutFallback

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
