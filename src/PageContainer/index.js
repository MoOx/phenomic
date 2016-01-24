import { connect } from "react-redux"
import * as pageActions from "../redux/modules/pages"

import PageContainer from "./component"

export default connect(
  ({ pages, layouts }) => {
    return { pages, layouts }
  },
  (dispatch) => {
    return {
      getPage: (page) => dispatch(pageActions.get(page)),
    }
  },
)(PageContainer)
