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
        presets: [
          {
            plugins: [ "a" ],
          },
        ],
        plugins: [ "b", "c" ],
      })
    ).toMatchSnapshot()

    expect(
      flattenConfiguration({
        presets: [
          {
            presets: [
              {
                plugins: [ "a" ],
              },
            ],
            plugins: [ "b" ],
          },
        ],
        plugins: [ "c", "d" ],

      })
    ).toMatchSnapshot()

  })

})
