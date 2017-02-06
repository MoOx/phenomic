import { testConfig } from ".."

it("should accept valid ports", () => {
  expect(() =>{
    testConfig({
      devPort: 1234,
    })
  })
  .not.toThrowError()
})

it("should not accept invalid ports", () => {
  expect(() =>{
    testConfig({
      devPort: -1,
    })
  })
  .toThrowError(
    "`devPort` must be a legal http port number"
  )

  expect(() =>{
    testConfig({
      devPort: "abc",
    })
  })
  .toThrowError(
    "`devPort` must be a legal http port number"
  )
})
