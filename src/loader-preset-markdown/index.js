// @flow

import defaultPlugins from "../loader-preset-default"
import initHeadDescriptionPropertyFromContent
  // eslint-disable-next-line max-len
  from "../loader-plugin-markdown-init-head.description-property-from-content"
import transformBodyPropertyToHtml
  from "../loader-plugin-markdown-transform-body-property-to-html"

export default [
  ...defaultPlugins,
  initHeadDescriptionPropertyFromContent,
  transformBodyPropertyToHtml,
]
