// @flow

import defaultPlugins from "../phenomic-loader-preset-default"

import initHeadDescriptionPropertyFromContent
  // eslint-disable-next-line max-len
  from "../phenomic-loader-plugin-markdown-init-head.description-property-from-content"
import transformBodyPropertyToHtml
  from "../phenomic-loader-plugin-markdown-transform-body-property-to-html"

export default [
  ...defaultPlugins,
  initHeadDescriptionPropertyFromContent,
  transformBodyPropertyToHtml,
]
