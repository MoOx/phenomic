import { connect } from "react-redux"
import * as pageActions from "../redux/modules/pages"

import PageContainer from "./component"

export default connect(
  ({ collection, loadPage, pages, layouts }) => ({
    collection,
    getPage: loadPage,
    pages,
    layouts,
  }),
  (dispatch) => {
    return {
      setPage: (...args) => dispatch(pageActions.set(...args)),
    }
  }
)(PageContainer)
