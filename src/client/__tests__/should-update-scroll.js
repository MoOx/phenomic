import dom from "../../_utils/jsdom"
import shouldUpdateScroll from "../should-update-scroll.js"

dom("http://localhost/test/")
// jsdom don't support window.scrollTo
// here is a POOR workaround
// $FlowFixMe window
window.scrollTo = (left, top) => {
  // $FlowFixMe window
  window.pageXOffset = left
  // $FlowFixMe window
  window.pageYOffset = top
}

const bigThing = document.createElement("div")
bigThing.id = "placeholder"
bigThing.innerHTML = "test"
bigThing.style.cssText = "width: 2000px; height: 4000px"

if (!(document.body && document.querySelectorAll && document.querySelector)) {
  expect(false).toBeTruthy()
}

document.body && document.body.appendChild(bigThing)

const someState = {
  location: {
    pathname: "/some-route",
    search: "",
    hash: "",
  },
}

const someStateButWithSearch = {
  location: {
    pathname: "/some-route",
    search: "?search",
    hash: "",
  },
}

const someStateButWithHash = {
  location: {
    pathname: "/some-route",
    search: "",
    hash: "#hash",
  },
}

const someStateButWithAnotherHash = {
  location: {
    pathname: "/some-route",
    search: "",
    hash: "#hash2",
  },
}

const anotherState = {
  location: {
    pathname: "/another-route",
    search: "",
    hash: "",
  },
}

const anotherStateWithHash = {
  location: {
    pathname: "/another-route",
    search: "",
    hash: "#hash",
  },
}

// case where we don't scroll
// false mean react-router addon won't handle a scroll to top
// (browser will handle scroll change, with hash and shit)

it("shouldUpdateScroll, new page, no need to scroll", () => {
  expect(shouldUpdateScroll(null, someState))
  .toBe(false)
})

it("shouldUpdateScroll, new page with hash, no need to scroll", () => {
  expect(shouldUpdateScroll(null, someStateButWithHash))
  .toBe(false)
})

it("shouldUpdateScroll, no hash to hash", () => {
  expect(shouldUpdateScroll(someState, someStateButWithHash))
  .toBe(false)
})

it("shouldUpdateScroll, same hash, again", () => {
  expect(shouldUpdateScroll(someStateButWithHash, someStateButWithHash))
  .toBe(false)
})

it("shouldUpdateScroll, another hash", () => {
  expect(shouldUpdateScroll(someStateButWithHash, someStateButWithAnotherHash))
  .toBe(false)
})

// Here we scroll

it("shouldUpdateScroll, same url, again (scroll to top expected)", () => {
  expect(shouldUpdateScroll(someState, someState))
  .toBe(true)
})

it("shouldUpdateScroll, hash to no hash", () => {
  expect(shouldUpdateScroll(someStateButWithHash, someState))
  .toBe(true)
})

it("shouldUpdateScroll, search, assuming page can change", () => {
  expect(shouldUpdateScroll(someState, someStateButWithSearch))
  .toBe(true)
})

it("shouldUpdateScroll, page change", () => {
  expect(shouldUpdateScroll(someState, anotherState))
  .toBe(true)
})

// Here we scroll, but by ourselves

it("shouldUpdateScroll, page change to a new page with hash and no data",
async () => {
  expect(shouldUpdateScroll(someState, anotherStateWithHash))
  .toBe(true)

  // hash does not exist in the document
  // $FlowFixMe find how to let flow know window have this scrollTo
  expect(window.pageYOffset)
  .toBe(0)

  console.log("innerHeight", document.body && document.body.clientHeight)

  // inject new stuff in the dom
  const thing = document.createElement("div")
  thing.id = anotherStateWithHash.location.hash.slice(1)
  thing.innerHTML = "test"
  document.body && document.body.appendChild(thing)

  // jsdom don't have a real getBoundingClientRect()
  // $FlowFixMe trick for jsdom
  thing.getBoundingClientRect = () => ({
    top: parseInt(bigThing.style.width, 10),
    left: 0, bottom: 0, right: 0,  width: 0, height: 0,
  })

  console.log("innerHeight after", document.body && document.body.clientHeight)

  // hash now does exist in the document
  await new Promise((resolve) => {
    // way a little so out async code works
    setTimeout(() => {
      // $FlowFixMe find how to let flow know window have this scrollTo
      expect(window.pageYOffset)
      .toBe(parseInt(bigThing.style.width, 10))
      resolve()
    }, 300)
  })

  // cleanup
  document.body && document.body.removeChild(thing)
  // reset poor jsdom scrollTo hack
  // $FlowFixMe window
  window.pageXOffset = 0
  // $FlowFixMe window
  window.pageYOffset = 0
})

it("shouldUpdateScroll, page change to a new page with hash",
async () => {
  // inject new stuff in the dom
  const thing = document.createElement("div")
  thing.id = anotherStateWithHash.location.hash.slice(1)
  thing.innerHTML = "test"
  document.body && document.body.appendChild(thing)

  // jsdom don't have a real getBoundingClientRect()
  // $FlowFixMe trick for jsdom
  thing.getBoundingClientRect = () => ({
    top: parseInt(bigThing.style.width, 10),
    left: 0, bottom: 0, right: 0,  width: 0, height: 0,
  })

  expect(shouldUpdateScroll(someState, anotherStateWithHash))
  .toBe(false)

  // hash already exists in the document
  await new Promise((resolve) => {
    // way a little so out async code works
    setTimeout(() => {
      // $FlowFixMe find how to let flow know window have this scrollTo
      expect(window.pageYOffset)
      .toBe(parseInt(bigThing.style.width, 10))
      resolve()
    }, 300)
  })

  // cleanup
  document.body && document.body.removeChild(thing)
  // reset poor jsdom scrollTo hack
  // $FlowFixMe window
  window.pageXOffset = 0
  // $FlowFixMe window
  window.pageYOffset = 0
})
