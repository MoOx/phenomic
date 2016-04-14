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
          offline: true,
          offlineConfig: {
            appcache: "foo",
            serviceWorker: 1,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "- You provided an 'string' for 'phenomic.offlineConfig.appcache' " +
      "option. This option accepts a boolean value.\n" +
      "- You provided an 'number' for " +
      "'phenomic.offlineConfig.serviceWorker' option. " +
      "This option accepts a boolean value."
    )
  )
})

test("should accept string for 'pattern' option", (t) => {
  t.deepEqual(
    configurator({ phenomic: {
      offline: true,
      offlineConfig: {
        pattern: "foo",
      },
    } }, []).offlineConfig.pattern,
    [ "foo" ]
  )
})

test("should accept array for 'pattern' option", (t) => {
  t.deepEqual(
    configurator({ phenomic: {
      offline: false,
      offlineConfig: {
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
          offline: true,
          offlineConfig: {
            pattern: false,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'boolean' for 'phenomic.offlineConfig.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: true,
          offlineConfig: {
            pattern: null,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'object' for 'phenomic.offlineConfig.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: true,
          offlineConfig: {
            pattern: undefined,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'undefined' for 'phenomic.offlineConfig.pattern'"
    )
  )
  t.throws(
    () => {
      configurator({
        phenomic: {
          offline: true,
          offlineConfig: {
            pattern: undefined,
          },
        },
      }, [])
    },
    (error) => error.message.includes(
      "You provided an 'undefined' for 'phenomic.offlineConfig.pattern'"
    )
  )
})
