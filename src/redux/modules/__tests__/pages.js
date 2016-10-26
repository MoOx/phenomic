import test from "jest-ava-api"

// eslint-disable-next-line import/no-namespace
import reducer, * as module from "../pages"

process.env.PHENOMIC_USER_PATHNAME = "/"

test("should have action to handle get", async (t) => {
  let expectations = 0

  global.fetch = (url) => {
    expectations++
    t.is(url, "/url")

    return new Promise((resolve) => resolve(
      {
        status: 200,
        json: () => new Promise((resolve) => resolve("json")),
      }
    ))
  }
  const action = module.get("/page", "/url")
  expect(expectations).toBe(1)

  t.is(action.page, "/page")
  t.deepEqual(action.types, [ module.GET, module.SET, module.ERROR ])
})

test("should have action to handle refresh", async (t) => {
  let expectations = 0

  global.fetch = (url) => {
    expectations++
    t.is(url, "/url")

    return new Promise((resolve) => resolve(
      {
        status: 200,
        json: () => new Promise((resolve) => resolve("json")),
      }
    ))
  }
  const action = module.refresh("/page", "/url")

  expect(expectations).toBe(1)
  t.is(action.page, "/page")
  t.deepEqual(action.types, [ module.NOOP, module.SET, module.ERROR ])
})

test("should have action to handle not found", (t) => {
  t.deepEqual(
    module.setNotFound("/page"),
    {
      type: module.ERROR,
      page: "/page",
    }
  )
})

test("reducer should handle initial state", (t) => {
  const nextState = reducer(undefined, { type: "@@INITIAL" })
  t.deepEqual(nextState, { })
})

test("reducer <-- GET, should set loading state", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.GET,
      page: "/foo",
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      loading: true,
    },
  })
})

test("reducer <-- FORGET", (t) => {
  const nextState = reducer(
    {
      "/foo": "bar",
    },
    {
      type: module.FORGET,
      page: "/foo",
    }
  )

  t.deepEqual(nextState, {
    "/foo": undefined,
  })
})

test("reducer should SET page", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.SET,
      page: "/foo",
      response: {
        json: {
          foo: "bar",
        },
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      type: undefined,
      foo: "bar",
    },
  })
})

test("reducer should SET page with type from head.type", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.SET,
      page: "/foo",
      response: {
        json: {
          head: {
            type: "foo",
          },
        },
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      head: {
        type: "foo",
      },
      type: "foo",
    },
  })
})

test("reducer should SET page with type from head.layout", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.SET,
      page: "/foo",
      response: {
        json: {
          head: {
            layout: "foo",
          },
        },
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      head: {
        layout: "foo",
      },
      type: "foo",
    },
  })
})

test("reducer <-- ERROR, no response", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.ERROR,
      page: "/foo",
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      error: 404,
    },
  })
})

test("reducer <-- ERROR, set error messages with response.status", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.ERROR,
      page: "/foo",
      response: {
        status: 404,
        statusText: "Foo",
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      error: 404,
      errorText: "Foo",
    },
  })
})

test("reducer <-- ERROR, set error messages with response.message", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.ERROR,
      page: "/foo",
      response: {
        message: "Foo",
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      error: "Unexpected Error",
      errorText: "Foo",
    },
  })
})

test("reducer <-- ERROR, set error messages with response.error.message",
(t) => {
  const nextState = reducer(
    {},
    {
      type: module.ERROR,
      page: "/foo",
      response: {
        error: {
          message: "Foo",
        },
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      error: "Unexpected Error",
      errorText: "Foo",
    },
  })
})

test("reducer <-- ERROR, set error messages with default message", (t) => {
  const nextState = reducer(
    {},
    {
      type: module.ERROR,
      page: "/foo",
      response: {
        foo: "bar",
      },
    }
  )

  t.deepEqual(nextState, {
    "/foo": {
      error: "Unexpected Error",
      errorText: "Seriously, this is weird. Please report this page.",
    },
  })
})
