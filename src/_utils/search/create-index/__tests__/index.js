import test from "ava"
import cheerio from "cheerio"

import headingsList from "../headings-list"
import headingsListResult from "./headings-list.json"

import findClosestHeading from "../find-closest-heading"
import findClosestHeadingResult from "./find-closest-heading-result"

import makeHierarchy from "../make-hierarchy"
import makeHierarchyResult from "./make-hierarchy-result.json"

import createIndex from ".."
// NOTE: The below markup is a flat tree
// indentations were added to make it readable
const document = `
<h1>1</h1>
  <h2>1.1</h2>
    <p>paragraph 1.1 - 1<span>foo</span></p>
    <p>paragraph 1.1 - 2<span>foo</span></p>
    <h3>1.1.1</h3>
    <h3>1.1.2</h3>
      <h4>1.1.2.1</h4>
        <h5>1.1.2.1.1</h5>
          <h6>1.1.2.1.1.1</h6>
            <p>paragraph 1.1.2.1.1.1 - 1<span>bar</span></p>
  <h2>1.2</h2>
<h1>2</h1>
<h1>3</h1>
  <h2>3.1</h2>
<h1>4</h1>
`

test("create a hierarchy index", (t) => {
  const $ = cheerio.load(document)
  t.deepEqual(
    headingsList($),
    headingsListResult,
    "it should parse html to headings list"
  )

  t.deepEqual(
    findClosestHeading($),
    findClosestHeadingResult,
    "it should find all paragraphs along with its closest heading"
  )

  t.deepEqual(
    makeHierarchy(headingsListResult, findClosestHeadingResult),
    makeHierarchyResult,
    "it should make a hierarchy based on headings list and paragraphs"
  )
})

test("main function", (t) => {
  t.deepEqual(createIndex(document), makeHierarchyResult)
})

test("it works with documnent with a single paragraph", (t) => {
  const html = `<p>
    Content here not used, see <code>src/layouts/PageError</code>
  </p>`

  t.truthy(createIndex(html))
})
