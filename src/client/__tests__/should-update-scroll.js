// @flow

import shouldUpdateScroll from "../should-update-scroll.js"

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

// case where we don't scroll
// false mean react-router addon won't handle a scroll to top
// (browser will handle scroll change, with hash and shit)

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

it("shouldUpdateScroll, new page, scroll", () => {
  expect(shouldUpdateScroll(null, someState))
  .toBe(true)
})

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
