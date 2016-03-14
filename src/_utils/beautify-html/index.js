// @flow
import {
  html as beautifyHTML,
  default_options as defaultOptions,
} from "js-beautify"

export default (html: string): string => (
  beautifyHTML(html, { ...defaultOptions, indent_size: 2 })
)
