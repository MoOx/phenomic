// @flow

// why
// export { default as Xxxx } from .. ?
// because
// https://github.com/facebook/flow/issues/1674

export { default as BodyContainer } from "./components/BodyContainer"
export { default as joinUri } from "url-join"

export const phenomicLoader = "phenomic/lib/phenomic-loader"

/* eslint-disable max-len */
export const phenomicLoaderPlugins = {
  initBodyPropertyFromContent: require("./phenomic-loader-plugin-init-body-property-from-content").default,
  initHeadPropertyFromConfig: require("./phenomic-loader-plugin-init-head-property-from-config").default,
  initHeadPropertyFromContent: require("./phenomic-loader-plugin-init-head-property-from-content").default,
  initRawPropertyFromContent: require("./phenomic-loader-plugin-init-raw-property-from-content").default,
  initRawBodyPropertyFromContent: require("./phenomic-loader-plugin-init-rawBody-property-from-content").default,
  markdownInitHeadDescriptionPropertyFromContent: require("./phenomic-loader-plugin-markdown-init-head.description-property-from-content").default,
  markdownTransformBodyPropertyToHtml: require("./phenomic-loader-plugin-markdown-transform-body-property-to-html").default,
}

export const phenomicLoaderPresets = {
  default: require("./phenomic-loader-preset-default").default,
  markdown: require("./phenomic-loader-preset-markdown").default,
}
