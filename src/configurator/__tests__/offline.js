import test from "ava"

import configurator from ".."

test("should default to false for 'offline' option", (t) => {
  t.is(
    configurator({}, []).offline,
    false
  )
})

test("should provide default offlineConfig when 'offline' = true", (t) => {
  t.deepEqual(
    configurator({ phenomic: { offline: true } }, []).offlineConfig,
    {
      serviceWorker: true,
      appcache: true,
      pattern: [ "**", "!**/*.html", "index.html" ],
    }
  )
})

test("should ONLY accept boolean for 'appcache' and 'serviceWorker'", (t) => {
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: {
            appcache: "foo",
            serviceWorker: 1,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "- You provided an 'string' for 'phenomic.offline.appcache' " +
      "option. This option accepts a boolean value.\n" +
      "- You provided an 'number' for " +
      "'phenomic.offline.serviceWorker' option. " +
      "This option accepts a boolean value."
    )
  )
})

test("should accept string for 'pattern' option", (t) => {
  t.deepEqual(
    configurator({ phenomic: {
      offline: {
        pattern: "foo",
      },
    } }, []).offlineConfig.pattern,
    [ "foo" ]
  )
})

test("should accept array for 'pattern' option", (t) => {
  t.deepEqual(
    configurator({ phenomic: {
      offline: {
        pattern: [ "foo", "bar" ],
      },
    } }, []).offlineConfig.pattern,
    [ "foo", "bar" ]
  )
})

test("should NOT accept boolean, null, undefined for 'pattern' option", (t) => {
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: {
            pattern: false,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'boolean' for 'phenomic.offline.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: {
            pattern: null,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'object' for 'phenomic.offline.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: {
            pattern: undefined,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'undefined' for 'phenomic.offline.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: {
            pattern: undefined,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'undefined' for 'phenomic.offline.pattern'"
    )
  )
})

// belows are deprecated
test("should fallback to config.offline = true when set appcache", (t) => {
  t.true(configurator({ phenomic: { appcache: true } }, []).offline)
  t.true(configurator({ phenomic: { appcache: "foo" } }, []).offline)
  t.true(configurator({ phenomic: { appcache: [ "foo" ] } }, []).offline)
})

test("should throw when define both appcache and offline option", (t) => {
  t.throws(
    () => {
      configurator({ phenomic: {
        appcache: true,
        offline: true,
      } }, [])
    },
    (error) => error.message.includes(
      "phenomic.appcache option was replaced by phenomic.offline option. " +
      " You can't define both of them at the same time."
    )
  )
})
