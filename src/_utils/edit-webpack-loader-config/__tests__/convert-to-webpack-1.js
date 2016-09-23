import test from "ava"
import converter from "../convert-to-webpack-1"

const scenarios = [
  {
    name: "single loader",
    from: {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            phenomic: "awesome",
          },
        },
      ],
    },
    to: {
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
      ],
    },
  },
  {
    name: "multiple loaders",
    from: {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            phenomic: "awesome",
          },
        },
        {
          loader: "bar-loader",
        },
      ],
    },
    to: {
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
        "bar-loader",
      ],
    },
  },
  {
    name: "multiple loaders with complex query string",
    from: {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            phenomic: "awesome",
          },
        },
        {
          loader: "bar-loader",
          query: {
            presets: [
              "foo",
              "bar",
              "baz",
            ],
          },
        },
      ],
    },
    to: {
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
        "bar-loader?presets=foo&presets=bar&presets=baz",
      ],
    },
  },
]

test("convert to webpack 1 format from normalized webpack 2 format", (t) => {
  scenarios.forEach((scenario) => {
    t.deepEqual(converter(scenario.from), scenario.to, scenario.name)
  })
})
