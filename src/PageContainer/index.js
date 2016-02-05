import { connect } from "react-redux"
import * as pageActions from "../redux/modules/pages"

import PageContainer from "./component"

export default connect(
  ({ collection, pages, layouts }) => ({
    collection,
    getPage: pages.getPage,
    pages,
    layouts,
  }),
  (dispatch) => {
    return {
      setPage: (...args) => dispatch(pageActions.set(...args)),
    }
  }
)(PageContainer)
