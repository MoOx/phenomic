// @flow

import initHeadPropertyFromConfig
  from "../phenomic-loader-plugin-init-head-property-from-config"
import initHeadPropertyFromContent
  from "../phenomic-loader-plugin-init-head-property-from-content"
import initBodyPropertyFromContent
  from "../phenomic-loader-plugin-init-body-property-from-content"

export default [
   // $FlowFixMe Missing annotation wtf?
  initHeadPropertyFromConfig,
   // $FlowFixMe Missing annotation wtf?
  initHeadPropertyFromContent,
   // $FlowFixMe Missing annotation wtf?
  initBodyPropertyFromContent,
]
