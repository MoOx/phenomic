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

  if (!(document.body && document.querySelectorAll && document.querySelector)) {
    expect(false).toBeTruthy()
  }

  if (document.body && document.querySelectorAll && document.querySelector) {
    document.body.appendChild(testElement)

    catchLinks(
      Array.prototype.slice.call(document.querySelectorAll(".test-catchLinks")),
      cb
    )

    const noA = document.querySelector(".test-catchLinks div")
    const noHref = document.querySelector(".test-catchLinks p a")
    const internalHash = document.querySelector(".test-catchLinks article a")
    const external = document.querySelector(".test-catchLinks div a")
    const ok = document.querySelector(".test-catchLinks span a")
    const ok2 = document.querySelector(".test-catchLinks span a small")

    noA && noA.click()
    noHref && noHref.click()
    internalHash && internalHash.click()
    external && external.click()
    ok && ok.click()
    ok2 && ok2.click()

    expect(cb.mock.calls.length).toBe(2)

    if (document.body) {
      document.body.removeChild(testElement)
    }
  }
})
