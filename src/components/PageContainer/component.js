/* eslint-disable react/sort-comp */
import React, { Component, PropTypes } from "react"
import { findDOMNode } from "react-dom"

import urlify from "../../_utils/urlify"
import catchLinks from "../../_utils/catch-links"
import { browserHistory } from "../../client"

const logPrefix = "phenomic: PageContainer:"

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
const splatToUrl = (string) => {
  const url = "/" + urlify(string)
  return (url === "//") ? "/" : url
}

function find(
  collection: PhenomicCollection,
  pageUrl: string
): ?PhenomicCollectionItem {
  return collection.find((item) => (
    item.__url === pageUrl ||
    item.__url === pageUrl + "/" ||
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
  const currentExactPageUrl = location.href.replace(getBase(location), "/")
  const itemURL = item.__url + location.search + location.hash

  if (currentExactPageUrl !== itemURL) {
    props.logger.info(
      `${ logPrefix } replacing by '${ currentExactPageUrl }' to '${ itemURL }'`
    )
    if (browserHistory) {
      browserHistory.replace(itemURL)
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

  componentWillMount() {
    const { props } = this
    if (!getLayout(props.defaultLayout, props)) {
      props.logger.error(
        `${ logPrefix } default layout "${ props.defaultLayout }" not provided.`
      )
    }
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

  cleanupInternalLinks: Function

  catchInternalLink() {
    const layoutDOMElement = findDOMNode(this)

    if (layoutDOMElement) {
      let bodyContainers =
        Array.prototype.slice.call(
          layoutDOMElement.querySelectorAll(".phenomic-BodyContainer")
        )
      if (!bodyContainers.length) {
        bodyContainers = [ layoutDOMElement ]
      }

      // as soon as we listened to something, we should carefully unlisten
      // because
      // - it can be listening in the layoutDOMElement (a parent)
      // - it can be listening in a <BodyContainer (a children)
      // if we don't do this cleanup, we might listen on a parent and a children
      // and if the parent contains other links to, let's say a parent part of
      // the website, <Link> might be catched (but they are not supposed to)
      if (this.cleanupInternalLinks) {
        this.cleanupInternalLinks()
      }
      this.cleanupInternalLinks =
      catchLinks(bodyContainers, (href) => {
        // do not catch links that are under the current base path
        if (href.indexOf(process.env.PHENOMIC_USER_PATHNAME) === -1) {
        // === if (!href.includes(process.env.PHENOMIC_USER_PATHNAME)) {
          return false
        }

        // lookup in collection by adjusting the link with our stored links
        const pageUrl = href
          // remove pathname as collection links don't have pathname included
          .replace(process.env.PHENOMIC_USER_PATHNAME, "/")
        if (
          !find(
            this.context.collection,
            pageUrl
            // remove hash for the lookup as it's not necessary
            .replace(/#.*/, "")
          )
        ) {
          return false
        }
        if (browserHistory) {
          browserHistory.push(pageUrl)
        }
        return true
      })
    }
  }

  preparePage(props: Props, context: Context): void {
    const pageUrl = splatToUrl(props.params.splat)
    if (process.env.NODE_ENV !== "production") {
      props.logger.info(
        `${ logPrefix } '${ pageUrl }' rendering...`
      )
    }

    const item = find(context.collection, pageUrl)
    if (
      typeof window !== "undefined" &&
      typeof window.location !== "undefined" &&
      item
    ) {
      adjustCurrentUrl(window.location, item, props)
    }

    const page = props.pages[pageUrl]
    if (!page) {
      if (item) {
        props.getPage(item.__url, item.__dataUrl)
      }
      else {
        props.logger.error(
          `${ logPrefix } ${ pageUrl } is a page not found.`
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
          `${ logPrefix } Unkown page type: "${ page.type }"` +
          "component not available in \"layouts\" property." +
          `Please check the "layout" or "type" of page "${ page }" header.`
        )
      }
    }
  }

  render() {
    const { props } = this
    const { collection } = this.context

    const pageUrl = splatToUrl(props.params.splat)
    // page url from redux store
    const page = props.pages[pageUrl]
    const partialPageHead = collection.find((pageData) => {
      return pageUrl === pageData.__url
    }) || {}

    if (!page) {
      if (process.env.NODE_ENV !== "production") {
        props.logger.info(`${ logPrefix } '${ pageUrl }' no data`)
      }
      // return null
    }
    if (process.env.NODE_ENV !== "production") {
      props.logger.info(`${ logPrefix } '${ pageUrl }'`, page)
    }

    if (
      typeof page !== "object" ||
      page.toString() !== "[object Object]"
    ) {
      props.logger.info(
        `${ logPrefix } page ${ pageUrl } should be an object`
      )
      return null
    }
    const PageLoading = getLayout("PageLoading", props)
    const PageError = getLayout("PageError", props)
    const LayoutFallback = getLayout(props.defaultLayout, props)
    const Layout = getLayout(
      (
        partialPageHead.type || partialPageHead.layout ||
        // page.type is head type||layout too
        page.type
      ),
      props
    ) || LayoutFallback

    if (page.error) {
      if (!PageError) {
        return (
          <div style={{ "text-align": "center" }}>
            <h1>{ page.error }</h1>
            <p>{ page.errorText }</p>
          </div>
        )
      }
      return <PageError { ...page } />
    }
    else if (
      page.isLoading &&
      PageLoading &&
      (Layout && !Layout.hasLoadingState)
    ) {
      return <PageLoading />
    }
    else if (Layout) {
      return (
        <Layout
          // head will be overwritten by "page"
          // (since page contains a head when loaded)
          head={ partialPageHead }
          { ...page }
        />
      )
    }

    if (process.env.NODE_ENV !== "production") {
      return (
        <div>
          { "No layout can be rendered. See console for more information." }
        </div>
      )
    }

    return null
  }
}

export default PageContainer
