import test from "ava"

import config, { testConfig } from ".."

test("should default to false for 'offline' option", (t) => {
  t.is(
    testConfig().offline,
    false
  )
})

test("should provide default offlineConfig when 'offline' = true", (t) => {
  t.deepEqual(
    testConfig({ offline: true }).offlineConfig,
    {
      serviceWorker: true,
      appcache: true,
      pattern: [ "**", "!**/*.html", "index.html" ],
    }
  )
})

test("should warn if serviceWorker is true with http", (t) => {
  t.plan(1)
  const warn = global.console.warn
  global.console.warn = (message) => {
    t.truthy(message.indexOf("ServiceWorker will be ignored") > -1)
  }
  config({
    pkg: {
      homepage: "http://te.st/",
      phenomic: {
        offline: true,
      },
    },
  })
  global.console.warn = warn
})

test("should ONLY accept boolean for 'appcache' and 'serviceWorker'", (t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: "foo",
        serviceWorker: 1,
      },
    })
  },
  (error) => error.message.includes(
    "- You provided an 'string' for 'phenomic.offline.appcache' " +
    "option. This option accepts a boolean value.\n" +
    "- You provided an 'number' for " +
    "'phenomic.offline.serviceWorker' option. " +
    "This option accepts a boolean value."
  ))
})

test("should accept string for 'pattern' option", (t) => {
  t.deepEqual(
    testConfig({
      offline: {
        pattern: "foo",
      },
    }).offlineConfig.pattern,
    [ "foo" ]
  )
})

test("should accept array for 'pattern' option", (t) => {
  t.deepEqual(
    testConfig({
      offline: {
        pattern: [ "foo", "bar" ],
      },
    }).offlineConfig.pattern,
    [ "foo", "bar" ]
  )
})

test("should NOT accept boolean, null, undefined for 'pattern' option", (t) => {
  t.throws(() => {
    testConfig({
      offline: {
        pattern: false,
      },
    })
  },
  (error) => error.message.includes(
    "You provided an 'boolean' for 'phenomic.offline.pattern'"
  ))
  t.throws(() => {
    testConfig({
      offline: {
        pattern: null,
      },
    })
  },
  (error) => error.message.includes(
    "You provided an 'object' for 'phenomic.offline.pattern'"
  ))
  t.throws(() => {
    testConfig({
      offline: {
        pattern: undefined,
      },
    })
  },
  (error) => error.message.includes(
    "You provided an 'undefined' for 'phenomic.offline.pattern'"
  ))
  t.throws(() => {
    testConfig({
      offline: {
        pattern: undefined,
      },
    })
  },
  (error) => error.message.includes(
    "You provided an 'undefined' for 'phenomic.offline.pattern'"
  ))
})

// belows are deprecated
test("should fallback to config.offline = true when set appcache", (t) => {
  t.true(testConfig({ appcache: true }).offline)
  t.true(testConfig({ appcache: "foo" }).offline)
  t.true(testConfig({ appcache: [ "foo" ] }).offline)
})

test("should throw when define both appcache and offline option", (t) => {
  t.throws(() => {
    testConfig({
      appcache: true,
      offline: true,
    })
  },
  (error) => error.message.includes(
    "phenomic.appcache option was replaced by phenomic.offline option. " +
    " You can't define both of them at the same time."
  ))
})
