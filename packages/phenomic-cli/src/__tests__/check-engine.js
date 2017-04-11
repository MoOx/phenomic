// module.exports is used
// eslint-disable-next-line import/default
import checkEngine from "../check-engine"

test("should not throw when sastifies", () => {
  expect(
    () => checkEngine("6.0.0", "3.0.0", false),
  ).not.toThrow()

  expect(
    () => checkEngine("6.0.0", "2.0.0", "0.16.0"),
  ).not.toThrow()
})

test("should throw when node version doesn't sastify", () => {
  expect(
    () => checkEngine("3.0.0", "2.0.0", false)
  ).toThrow(
    // $FlowFixMe interface is incorrect
    /node version is 3.0.0/
  )
})

test("should throw when npm version doesn't sastify", () => {
  expect(
    () => checkEngine("4.2.0", "2.0.0", false),
  ).toThrow(
    // $FlowFixMe interface is incorrect
    /npm version is 2.0.0/
  )
})

test("should throw when both node and npm version doesn't sastify", () => {
  expect(
    () => checkEngine("3.0.0", "2.0.0", false)
  ).toThrow(
    // $FlowFixMe interface is incorrect
    /node version is 3.0.0 (.*) npm version is 2.0.0/
  )
})

test("should throw when npm or yarn version doesn't sastify", () => {
  expect(
    () => checkEngine("6.0.0", "2.0.0", "0.15.0"),
  ).toThrow()
})
