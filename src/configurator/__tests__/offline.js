import test from "ava"

import config, { testConfig } from ".."
import { defaultOfflineConfig } from "../validators/offline.js"

test("should default to false for 'offline' option", (t) => {
  t.is(
    testConfig().offline,
    false
  )
})

test("should provide default offlineConfig when 'offline' = true", (t) => {
  t.deepEqual(
    testConfig({ offline: true }).offlineConfig,
    defaultOfflineConfig
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

test("should not accept invalid types for 'appcache' and 'serviceWorker'",
(t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: "foo",
        serviceWorker: 1,
      },
    })
  },
  (error) => (
    error.message.includes(
      "- You provided an incorrect type ('string') " +
      "for 'phenomic.offline.appcache' option."
    ) &&
    error.message.includes(
      "- You provided an incorrect type ('number') " +
      "for 'phenomic.offline.serviceWorker' option."
    )
  ))
})

test("should not accept invalid types or missing key",
(t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: {
          test: "wat",
        },
      },
    })
  },
  (error) => (
    error.message.includes(
      "You provided some key(s)for 'phenomic.offline.appcache' "+
      "option that are not recognized (test)"
    ) &&
    error.message.includes(
      "- You provided an incorrect type ('undefined') "+
      "for 'phenomic.offline.serviceWorker' option."
    ) &&
    error.message.includes(
      "- You provided an incorrect type ('undefined') "+
      "for 'phenomic.offline.cachePatterns' option."
    )
  ))
})

test("should not accept string for 'cachePatterns' option", (t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: true,
        serviceWorker: true,
        cachePatterns: "foo",
      },
    })
  },
  (error) => (
    error.message.includes(
      "- You provided an incorrect type ('string') "+
      "for 'phenomic.offline.cachePatterns' option."
    )
  ))
})

test("should not accept any keys for the patterns option", (t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: true,
        serviceWorker: true,
        cachePatterns: {
          lol: "wat",
        },
      },
    })
  },
  (error) => (
    error.message.includes(
      "- You provided some key(s) for 'phenomic.offline.cachePatterns' " +
      "option that are not recognized or with incorrect types (lol). " +
      "This option accepts a object with with 4 keys: "+
      "onInstall, afterInstall, onDemand, excludes " +
      "that accept array of glob patterns."
    )
  ))
})

test("should not accept any keys for the patterns option", (t) => {
  t.throws(() => {
    testConfig({
      offline: {
        appcache: true,
        serviceWorker: true,
        cachePatterns: {
          onInstall: "wat",
        },
      },
    })
  },
  (error) => (
    error.message.includes(
      "- You provided some key(s) for 'phenomic.offline.cachePatterns' " +
      "option that are not recognized or with incorrect types (onInstall). "
    )
  ))
})

test("should accept correct patterns option", (t) => {
  t.notThrows(() => {
    testConfig({
      offline: {
        appcache: true,
        serviceWorker: true,
        cachePatterns: {
          onInstall: [ "wat" ],
        },
      },
    })
  })
})
