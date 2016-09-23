import test from "ava"
import converter from "../convert-to-webpack-2"

const scenarios = [
  {
    name: "should not touch un-relevant properties",
    from: {
      test: "foo",
      loader: "foo-loader",
      foo: "bar",
      bar: "baz",
    },
    to: {
      test: "foo",
      foo: "bar",
      bar: "baz",
      loaders: [ {
        loader: "foo-loader",
      } ],
    },
  },
  {
    name: "loader: single loader with no query string",
    from: {
      test: "foo",
      loader: "foo-loader",
    },
    to: {
      test: "foo",
      loaders: [ {
        loader: "foo-loader",
      } ],
    },
  },
  {
    name: "loader: single loader with query string",
    from: {
      test: "foo",
      loader: "foo-loader?name=foo",
    },
    to: {
      test: "foo",
      loaders: [ {
        loader: "foo-loader",
        query: {
          name: "foo",
        },
      } ],
    },
  },
  {
    name: "loader: multiple loader with no query string",
    from: {
      test: "foo",
      loader: "foo-loader!bar-loader",
    },
    to: {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
        },
        {
          loader: "bar-loader",
        },
      ],
    },
  },
  {
    name: "loader: multiple loader with query string on 1 loader",
    from: {
      test: "foo",
      loader: "foo-loader!bar-loader?name=foo",
    },
    to: {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
        },
        {
          loader: "bar-loader",
          query: {
            name: "foo",
          },
        },
      ],
    },
  },
  {
    name: "loader: multiple loader with query string on all of them",
    from: {
      test: "foo",
      loader: "foo-loader?phenomic=awesome!bar-loader?name=foo",
    },
    to: {
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
            name: "foo",
          },
        },
      ],
    },
  },
  {
    name: "loaders: single loader defined by string",
    from: {
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
      ],
    },
    to: {
      test: "foo",
      loaders: [ {
        loader: "foo-loader",
        query: {
          phenomic: "awesome",
        },
      } ],
    },
  },
  {
    name: "loaders: multiple loaders defined by string and object",
    from: {
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
        {
          loader: "bar-loader",
        },
        {
          loader: "baz-loader",
          query: {
            phenomic: "awesome",
          },
        },
      ],
    },
    to: {
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
        {
          loader: "baz-loader",
          query: {
            phenomic: "awesome",
          },
        },
      ],
    },
  },
]

test("convert to normalized webpack 2 format", (t) => {
  scenarios.forEach((scenario) => {
    t.deepEqual(converter(scenario.from), scenario.to, scenario.name)
  })
})
