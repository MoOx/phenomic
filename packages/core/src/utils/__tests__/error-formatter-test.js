import path from "path";

import errorFormatter, { help } from "../error-formatter.js";

const s = path.sep;

test("errorFormatter", () => {
  const cwd = process.cwd();
  const error = new Error();
  error.message = "Test";

  error.stack = `
TypeError:

clientBundleStats.toJson is not a function

    at ${cwd}${s}lib${s}builder${s}index.js:66:70
    at exports.default (${cwd}${s}lib${s}_utils${s}log${s}index.js:88:17)
    at ${cwd}${s}lib${s}builder${s}index.js:63:34
    at run (${cwd}${s}node_modules${s}core-js${s}modules${s}es6.promise.js:87:22)
    at ${cwd}${s}node_modules${s}core-js${s}modules${s}es6.promise.js:100:28
    at flush (${cwd}${s}node_modules${s}core-js${s}modules${s}_microtask.js:18:9)
    at _combinedTickCallback (internal${s}process${s}next_tick.js:67:7)
    at process._tickCallback (internal${s}process${s}next_tick.js:98:9)
    at Module.runMain (module.js:592:11)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
`;
  expect(errorFormatter(error).stack).toBe(
    `
TypeError:

clientBundleStats.toJson is not a function

    at lib${s}builder${s}index.js:66:70
    at exports.default (lib${s}_utils${s}log${s}index.js:88:17)
    at lib${s}builder${s}index.js:63:34
    at run (node_modules${s}core-js${s}modules${s}es6.promise.js:87:22)
    at node_modules${s}core-js${s}modules${s}es6.promise.js:100:28
    at flush (node_modules${s}core-js${s}modules${s}_microtask.js:18:9)
    at _combinedTickCallback (internal${s}process${s}next_tick.js:67:7)
    at process._tickCallback (internal${s}process${s}next_tick.js:98:9)
    at Module.runMain (module.js:592:11)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
`,
  );

  error.stack = `
TypeError:

window is not defined

    at blah
`;
  expect(errorFormatter(error).stack).toBe(
    `
TypeError:

window is not defined

    at blah
` + help,
  );
});
