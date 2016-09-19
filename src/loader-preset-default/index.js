// @flow

import initHeadPropertyFromConfig
  from "../loader-plugin-init-head-property-from-config"
import initHeadPropertyFromContent
  from "../loader-plugin-init-head-property-from-content"
import initBodyPropertyFromContent
  from "../loader-plugin-init-body-property-from-content"

export default [
  initHeadPropertyFromConfig,
  initHeadPropertyFromContent,
  initBodyPropertyFromContent,
]
