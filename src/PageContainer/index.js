import { connect } from "react-redux"
import * as pageActions from "../redux/modules/pages"

import PageContainer from "./component"

export default connect(
  ({ pages, pageComponents }) => {
    return { pages, pageComponents }
  },
  (dispatch) => {
    return {
      getPage: (page) => dispatch(pageActions.get(page)),
    }
  },
)(PageContainer)
