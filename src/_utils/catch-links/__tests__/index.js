// @flow

import dom from "../../../_utils/jsdom"
import catchLinks from "../index.js"

dom("http://localhost/")

it("should only catch internal links from the same domain", () => {
  const cb = jest.fn()

  const testElement = document.createElement("div")
  testElement.setAttribute("class", "test-catchLinks")
  testElement.innerHTML = `
  <p>
    test p
    <a>
      test p a
    </a>
  </p>
  <article>
    test article
    <a href="#internal">
      test article a
    </a>
  </article>
  <div>
    test div
    <a href="http://external/#div">
      test div a
    </a>
  </div>
  <span>
    test span
    <a href="http://localhost/#span">
      test
      <small>span</small>
      a
    </a>
  </span>
  `
  document.body.appendChild(testElement)

  catchLinks(
    Array.prototype.slice.call(document.querySelectorAll(".test-catchLinks")),
    cb
  )

  document.querySelector(".test-catchLinks div").click() // no A
  document.querySelector(".test-catchLinks p a").click() // no href
  document.querySelector(".test-catchLinks article a").click() // internal hash
  document.querySelector(".test-catchLinks div a").click() // external
  document.querySelector(".test-catchLinks span a").click()
  document.querySelector(".test-catchLinks span a small").click()

  expect(cb.mock.calls.length).toBe(2)

  document.body.removeChild(testElement)
})
