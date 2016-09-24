/* eslint-disable max-len */

import test from "ava"
import multili from "multili"

import errorFormatter from "../index.js"

test("errorFormatter", (t) => {
  const cwd = process.cwd()
  const error = new Error()
  error.message = "Test"
  error.stack = multili(`
    TypeError:

    clientBundleStats.toJson is not a function

        at ${ cwd }/lib/builder/index.js:66:70
        at exports.default (${ cwd }/lib/_utils/log/index.js:88:17)
        at ${ cwd }/lib/builder/index.js:63:34
        at run (${ cwd }/node_modules/core-js/modules/es6.promise.js:87:22)
        at ${ cwd }/node_modules/core-js/modules/es6.promise.js:100:28
        at flush (${ cwd }/node_modules/core-js/modules/_microtask.js:18:9)
        at _combinedTickCallback (internal/process/next_tick.js:67:7)
        at process._tickCallback (internal/process/next_tick.js:98:9)
        at Module.runMain (module.js:592:11)
        at run (bootstrap_node.js:394:7)
        at startup (bootstrap_node.js:149:9)
        at bootstrap_node.js:509:3
  `)
  t.is(
    errorFormatter(error).stack,
    multili(`
      TypeError:

      clientBundleStats.toJson is not a function

          at ./lib/builder/index.js:66:70
          at exports.default (./lib/_utils/log/index.js:88:17)
          at ./lib/builder/index.js:63:34
          at run (./node_modules/core-js/modules/es6.promise.js:87:22)
          at ./node_modules/core-js/modules/es6.promise.js:100:28
          at flush (./node_modules/core-js/modules/_microtask.js:18:9)
          [ truncated stack ]
    `)
  )
})
