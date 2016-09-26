// @flow

import webpack from "webpack"

export default () => (
  typeof webpack.optimize.OccurenceOrderPlugin === "function"
  ? 1
  : 2
)
