import React, { Component } from "react"
import { PropTypes } from "react"

function splatToUri(string) {
  return string.replace(/\/index\.html$/, "")
}

export default class PageContainer extends Component {

  static propTypes = {

    pages: PropTypes.object.isRequired,
    layouts: PropTypes.object.isRequired,
    params: PropTypes.object,

    defaultLayout: PropTypes.string,

    // actions
    getPage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    defaultLayout: "Page",
  };

  componentWillMount() {
    this.preparePage(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.preparePage(nextProps)
  }

  preparePage(props) {
    if (!props.layouts[props.defaultLayout]) {
      console.error(
        "statinamic: PageContainer: " +
        `default layout "${ props.defaultLayout }" doesn't exist. ` +
        `Please check your configuration ("layouts" part). ` +
        `If you haven't defined "${ props.defaultLayout }", you should. `
      )
    }

    const pageKey = splatToUri(props.params.splat)
    if (__DEV__) {
      console.info(`statinamic: PageContainer: pageKey ${ pageKey }`)
    }
    const page = props.pages[pageKey]
    if (!page) {
      props.getPage(pageKey)
    }
    else {
      if (page.error) {
        return
      }

      const Layout = this.getLayout(props, page)
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

  getLayout(props, page) {
    return props.layouts[page.type || props.defaultLayout]
  }

  render() {
    const pageKey = splatToUri(this.props.params.splat)

    const page = this.props.pages[pageKey]

    if (!page) {
      console.info(`statinamic: PageContainer: no data for page ${ pageKey }`)
      return null
    }

    if (typeof page !== "object") {
      console.info(
        `statinamic: PageContainer: page ${ pageKey } should be an object`
      )
      return null
    }

    const PageLoading = this.props.layouts.PageLoading
    const PageError = this.props.layouts.PageError
    const Layout = this.getLayout(this.props, page)

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
