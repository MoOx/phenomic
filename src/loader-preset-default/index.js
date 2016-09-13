// @flow

import initHeadPropertyFromConfig
  from "../loader-plugin-init-head-property-from-config"
import initHeadPropertyFromContent
  from "../loader-plugin-init-head-property-from-content"
import initBodyPropertyFromContent
  from "../loader-plugin-init-body-property-from-content"

export default [
   // $FlowFixMe Missing annotation wtf?
  initHeadPropertyFromConfig,
   // $FlowFixMe Missing annotation wtf?
  initHeadPropertyFromContent,
   // $FlowFixMe Missing annotation wtf?
  initBodyPropertyFromContent,
]
