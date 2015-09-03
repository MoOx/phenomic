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
      setPageType: (page, type) => dispatch(pageActions.setType(page, type)),
      unknownPageType: (page, type) =>
        dispatch(pageActions.unknownType(page, type)),
    }
  },
)
class PageContainer extends Component {

  static propTypes = {
    pages: PropTypes.object.isRequired,
    pageComponents: PropTypes.object.isRequired,
    params: PropTypes.object,

    // components
    NotFound: PropTypes.object,
    Loading: PropTypes.object,

    // actions
    setPageType: PropTypes.func.isRequired,
    unknownPageType: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.preparePage(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.preparePage(nextProps)
  }

  preparePage(props) {
    const pageKey = props.params.splat.replace(/\/index\.html$/, "")
    const page = props.pages[pageKey]
    if (!page) {
      props.getPage(pageKey)
    }
    else {
      if (page.error) {
        return
      }

      if (!page.type) {
        let pageComponentName = "Page"
        if (page && page.head) {
          pageComponentName = page.head.layout || page.head.type
        }

        const PageComponent = props.pageComponents[pageComponentName]
        if (!PageComponent) {
          props.unknownPageType(pageKey, pageComponentName)
        }
      }
    }
  }

  render() {
    // console.log(this.props)
    const pageKey = this.props.params.splat

    const page = this.props.pages[pageKey]
    if (!page) {
      // console.log("FUCK WAT")
      return null
    }

    const PageComponent = this.props.pageComponents[page.type]

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
