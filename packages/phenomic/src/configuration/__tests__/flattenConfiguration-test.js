import flattenConfiguration from "../flattenConfiguration"

describe("flattenConfiguration", () => {

  it("should flatten correctly", () => {

    expect(
      flattenConfiguration({
        plugins: [ "a", "b" ],
      })
    ).toMatchSnapshot()

    expect(
      flattenConfiguration({
        plugins: [ "a", "b" ],
        presets: [
          {
            plugins: [ "c" ],
          },
        ],
      })
    ).toMatchSnapshot()

    expect(
      flattenConfiguration({
        plugins: [ "a", "b" ],
        presets: [
          {
            plugins: [ "c" ],
            presets: [
              {
                plugins: [ "d" ],
              },
            ],
          },
        ],
      })
    ).toMatchSnapshot()

  })

})
