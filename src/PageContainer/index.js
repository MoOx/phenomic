import React, { Component } from "react"
import { PropTypes } from "react"

import { connect } from "react-redux"
import * as pageActions from "../ducks/pages"

export default
@connect(
  ({ pages, pageComponents }) => {
    return { pages, pageComponents }
  },
  (dispatch) => {
    return {
      getPage: (page) => dispatch(pageActions.get(page)),
    }
  },
)
class PageContainer extends Component {

  static propTypes = {

    pages: PropTypes.object.isRequired,
    pageComponents: PropTypes.object.isRequired,
    params: PropTypes.object,

    defaultComponent: PropTypes.string,

    // components
    NotFound: PropTypes.object,
    Loading: PropTypes.object,

    // actions
    setPageType: PropTypes.func.isRequired,
    unknownPageType: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultComponent: "Page",
  }

  componentWillMount() {
    this.preparePage(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.preparePage(nextProps)
  }

  preparePage(props) {
    if (!props.pageComponents[props.defaultComponent]) {
      console.error(
        "statinamic: " +
        `default component "${ props.defaultComponent }" doesn't exist. ` +
        `Please check your configuration ("pageComponents" part). ` +
        `If you haven't defined "${ props.defaultComponent }", you should. `
      )
    }

    const pageKey = props.params.splat.replace(/\/index\.html$/, "")
    const page = props.pages[pageKey]
    if (!page) {
      props.getPage(pageKey)
    }
    else {
      if (page.error) {
        return
      }

      const PageComponent = this.getPageComponent(props, page)
      if (page.type !== undefined && !PageComponent) {
        console.error(
          "statinamic: " +
          `Unkown page type: "${ page.type }" component not available in ` +
          `"pageComponents" property. ` +
          `Please check the "layout" or "type" of page "${ page }" header.`
        )
      }
    }
  }

  getPageComponent(props, page) {
    return props.pageComponents[page.type || props.defaultComponent]
  }

  render() {
    const pageKey = this.props.params.splat

    const page = this.props.pages[pageKey]
    if (!page) {
      return null
    }

    const PageComponent = this.getPageComponent(this.props, page)

    return (
      <div>
        {
          page && !page.error && page.loading && this.props.Loading
        }

        {
          page && !!page.error && !this.props.NotFound &&
          <div>
            <h1>{ page.error }</h1>
            <p>{ page.errorText }</p>
          </div>
        }
        {
          page && !!page.error && this.props.NotFound
        }

        {
          page && !page.error && !page.loading && PageComponent &&
          <PageComponent { ...page } />
        }
      </div>
    )
  }
}
