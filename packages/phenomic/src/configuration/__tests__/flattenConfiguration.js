import flattenConfiguration from "../flattenConfiguration"

function a() {}
function b() {}
function c() {}
function d() {}

test("should flatten correctly", () => {

  expect(
    flattenConfiguration({
      plugins: [ a, b ],
    })
  ).toEqual([ a, b ])

  expect(
    flattenConfiguration({
      presets: [
        () => ({
          plugins: [ a ],
        }),
      ],
      plugins: [ b, c ],
    })
  ).toEqual([ a, b, c ])

  expect(
    flattenConfiguration({
      presets: [
        () => ({
          presets: [
            () => ({
              plugins: [ a ],
            }),
          ],
          plugins: [ b ],
        }),
      ],
      plugins: [ c, d ],

    })
  ).toEqual([ a, b, c, d ])

})
