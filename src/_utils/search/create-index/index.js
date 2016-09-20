// @flow
import cheerio from "cheerio"
import headingsList from "./headings-list"
import findClosestHeading from "./find-closest-heading"
import makeHierarchy from "./make-hierarchy"
import type { hierarchy } from "./make-hierarchy"

const createIndexFromHTML = (html: string): hierarchy => {
  const $ = cheerio.load(html)
  const headingsListResult = headingsList($)
  const paragraphsWithClosestHeading = findClosestHeading($)

  return makeHierarchy(
    headingsListResult,
    paragraphsWithClosestHeading
  )
}

export default createIndexFromHTML
