import {
  html as beautifyHTML,
  default_options as defaultOptions,
} from "js-beautify"

export default (html) => (
  beautifyHTML(html, { ...defaultOptions, indent_size: 2 })
)
