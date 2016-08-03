// @flow

import addHeadPropertyFromConfig
  from "../content-loader-plugins/add-head-property-from-config"
import addHeadPropertyFromContent
  from "../content-loader-plugins/add-head-property-from-content"
import addHead_DescriptionPropertyFromMdContent
  from "../content-loader-plugins/add-head.description-property-from-md-content"
import addBodyPropertyFromContent
  from "../content-loader-plugins/add-body-property-from-content"
import transformMdBodyPropertyToHtml
  from "../content-loader-plugins/transform-md-body-property-to-html"

const defautPlugins: Array<PhenomicContentLoaderPlugin> = [
  addHeadPropertyFromConfig,
  addHeadPropertyFromContent,
  addHead_DescriptionPropertyFromMdContent,
  addBodyPropertyFromContent,
  transformMdBodyPropertyToHtml,
]

export default defautPlugins
