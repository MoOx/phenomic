import test from "ava"
import { test as editor } from "../"

const scenarios = [
  {
    name: "1 file type, 1 loader, `loader`",
    from: [ {
      test: "foo",
      loader: "foo-loader?current=value",
    } ],
    loaderName: "foo-loader",
    queryEdition: {
      current: "newValue",
      new: "value",
    },
    to: [ {
      test: "foo",
      loaders: [ "foo-loader?current=newValue&new=value" ],
    } ],
  },
  {
    name: "1 file type, multi loaders, `loader`",
    from: [ {
      test: "foo",
      loader: "foo-loader?current=value!bar-loader",
    } ],
    loaderName: "foo-loader",
    queryEdition: {
      current: "newValue",
      new: "value",
    },
    to: [ {
      test: "foo",
      loaders: [
        "foo-loader?current=newValue&new=value",
        "bar-loader",
      ],
    } ],
  },
  {
    name: "multi file types, 1 loaders, `loader`",
    from: [
      {
        test: "foo",
        loader: "foo-loader?current=value!bar-loader",
      },
      {
        test: "baz",
        loader: "baz-loader",
      },
    ],
    loaderName: "foo-loader",
    queryEdition: {
      current: "newValue",
      new: "value",
    },
    to: [
      {
        test: "foo",
        loaders: [
          "foo-loader?current=newValue&new=value",
          "bar-loader",
        ],
      },
      {
        test: "baz",
        loaders: [ "baz-loader" ],
      },
    ],
  },
  {
    name: "WP2: 1 file type, 1 loader, `loaders`",
    from: [ {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            current: "value",
          },
        },
      ],
    } ],
    loaderName: "foo-loader",
    queryEdition: {
      current: "newValue",
      new: "value",
    },
    webpack2: true,
    to: [ {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            current: "newValue",
            new: "value",
          },
        },
      ],
    } ],
  },
  {
    name: "WP2: 1 file type, multi loaders, `loaders`",
    from: [ {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            current: "value",
          },
        },
        "bar-loader",
      ],
    } ],
    loaderName: "foo-loader",
    queryEdition: {
      current: "newValue",
      new: "value",
    },
    webpack2: true,
    to: [ {
      test: "foo",
      loaders: [
        {
          loader: "foo-loader",
          query: {
            current: "newValue",
            new: "value",
          },
        },
        {
          loader: "bar-loader",
        },
      ],
    } ],
  },
]

const shortLoadersNamescenarios = [
  {
    name: "short loader name in config",
    from: [ {
      test: "foo",
      loader: "foo?current=value",
    } ],
    loaderName: "foo-loader",
    queryEdition: { current: "newValue" },
    to: [ {
      test: "foo",
      loaders: [ "foo?current=newValue" ],
    } ],
  },
  {
    name: "short loader name in function argument",
    from: [ {
      test: "foo",
      loader: "foo-loader?current=value",
    } ],
    loaderName: "foo",
    queryEdition: { current: "newValue" },
    to: [ {
      test: "foo",
      loaders: [ "foo-loader?current=newValue" ],
    } ],
  },
]

const testScenarios = (scenarios, t) => {
  scenarios.forEach((scenario) => {
    t.deepEqual(
      editor(
        scenario.from,
        scenario.loaderName,
        scenario.queryEdition,
        scenario.webpack2
      ),
      scenario.to,
      scenario.name,
    )
  })
}

test("edit or add query for loader", (t) => {
  testScenarios(shortLoadersNamescenarios, t)
})

test("support for short loader name", (t) => {
  testScenarios(scenarios, t)
})
