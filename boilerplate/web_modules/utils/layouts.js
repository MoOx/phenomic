/*
 * Content layouts
 * To add a new layout, import it below and add it to the "layouts" variable
 *
 * To specify a layout for some content, add it to the YAML Front Matter of
 * the .md file, see /docs/statinamic.md
 *
 */

import Page from "layouts/Page"
import PageError from "layouts/PageError"

const layouts = {
  Page,
  PageError,
}

export default layouts
