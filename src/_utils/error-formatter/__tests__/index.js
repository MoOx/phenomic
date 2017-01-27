/* eslint-disable max-len */

import path from "path"

import test from "jest-ava-api"
import multili from "multili"

import errorFormatter from "../index.js"

const s = path.sep

test("errorFormatter", (t) => {
  const cwd = process.cwd()
  const error = new Error()
  error.message = "Test"
  error.stack = multili(`
    TypeError:

    clientBundleStats.toJson is not a function

        at ${ cwd }${ s }lib${ s }builder${ s }index.js:66:70
        at exports.default (${ cwd }${ s }lib${ s }_utils${ s }log${ s }index.js:88:17)
        at ${ cwd }${ s }lib${ s }builder${ s }index.js:63:34
        at run (${ cwd }${ s }node_modules${ s }core-js${ s }modules${ s }es6.promise.js:87:22)
        at ${ cwd }${ s }node_modules${ s }core-js${ s }modules${ s }es6.promise.js:100:28
        at flush (${ cwd }${ s }node_modules${ s }core-js${ s }modules${ s }_microtask.js:18:9)
        at _combinedTickCallback (internal${ s }process${ s }next_tick.js:67:7)
        at process._tickCallback (internal${ s }process${ s }next_tick.js:98:9)
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

          at lib${ s }builder${ s }index.js:66:70
          at exports.default (lib${ s }_utils${ s }log${ s }index.js:88:17)
          at lib${ s }builder${ s }index.js:63:34
          at run (node_modules${ s }core-js${ s }modules${ s }es6.promise.js:87:22)
          at node_modules${ s }core-js${ s }modules${ s }es6.promise.js:100:28
          at flush (node_modules${ s }core-js${ s }modules${ s }_microtask.js:18:9)
          at _combinedTickCallback (internal${ s }process${ s }next_tick.js:67:7)
          at process._tickCallback (internal${ s }process${ s }next_tick.js:98:9)
          at Module.runMain (module.js:592:11)
          at run (bootstrap_node.js:394:7)
          at startup (bootstrap_node.js:149:9)
          at bootstrap_node.js:509:3
    `)
  )

  error.stack = multili(`
    TypeError:

    ReferenceError: firebase is not defined

        at Object.module.exports.exports.isClient (webpack:${ s }~${ s }firebase${ s }firebase.js:31:1)
        at __webpack_require__ (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:19:1)
        at Object.module.exports.Object.defineProperty.value (webpack:${ s }scripts${ s }phenomic.node.js:3:1)
        at __webpack_require__ (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:19:1)
        at module.exports.Object.assign.i (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:39:1)
        at Object.<anonymous> (${ cwd }${ s }node_modules${ s }.cache${ s }phenomic${ s }webpack-node-build${ s }phenomic.node.bundle.js:45:10)
  `)
  t.is(
    errorFormatter(error).stack,
    multili(`
      TypeError:

      ReferenceError: firebase is not defined

          at Object.module.exports.exports.isClient (node_modules${ s }firebase${ s }firebase.js:31:1)
          at __webpack_require__ (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:19:1)
          at Object.module.exports.Object.defineProperty.value (webpack:${ s }scripts${ s }phenomic.node.js:3:1)
          at __webpack_require__ (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:19:1)
          at module.exports.Object.assign.i (webpack:${ s }webpack${ s }bootstrap bac9bec32862a3081f90:39:1)
          at Object.<anonymous> (phenomic.node.bundle.js:45:10)
    `)
  )
})
