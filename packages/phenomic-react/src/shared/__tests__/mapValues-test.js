import mapValues from "../mapValues"

describe("mapValues", () => {

  it("should map object values", () => {
    expect(mapValues({ a: 1, b: 2 }, value => value * 2)).toMatchSnapshot()
  })

})
