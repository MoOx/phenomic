import resolveAll from "../resolveAll"

describe("resolveAll", () => {

  it("should resolve all values in object", () => {
    return resolveAll({ a: Promise.resolve(1), b: Promise.resolve(2) })
      .then(values => {
        expect(values).toMatchSnapshot()
      })
  })

  it("should resolve non promises values", () => {
    return resolveAll({ a: Promise.resolve(1), b: 2 })
      .then(values => {
        expect(values).toMatchSnapshot()
      })
  })

  it("should reject if a promise rejects", () => {
    return resolveAll({ a: Promise.resolve(1), b: Promise.reject(2) })
      .catch(reason => {
        expect(reason).toMatchSnapshot()
      })
  })

})
