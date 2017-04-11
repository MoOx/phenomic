import { flattenPresets } from "../flattenConfiguration"

const a = () => ({ name: "a" })
const b = () => ({ name: "b" })
const c = () => ({ name: "c" })
const d = () => ({ name: "d" })

test("should flatten correctly", () => {

  expect(
    flattenPresets({
      plugins: [ a, b ],
    })
  ).toEqual([ { name: "a" }, { name: "b" } ])

  expect(
    flattenPresets({
      presets: [
        () => ({
          plugins: [ a ],
        }),
      ],
      plugins: [ b, c ],
    })
  ).toEqual([ { name: "a" }, { name: "b" }, { name: "c" } ])

  expect(
    flattenPresets({
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
  ).toEqual([ { name: "a" }, { name: "b" }, { name: "c" }, { name: "d" } ])

})
