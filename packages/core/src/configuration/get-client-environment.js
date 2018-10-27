// @flow

// inspired from https://github.com/facebook/create-react-app/blob/779dad55465de81972ec72257c734e4afae17094/packages/react-scripts/config/env.js

import fs from "fs";
import path from "path";
import { format } from "url";

// Grab NODE_ENV and PHENOMIC_* environment variables and prepare them to be
// injected into the application.
const NODE_ENV = process.env.NODE_ENV || "development";
const RE_PHENOMIC = /^PHENOMIC_/i;
const root = path.join(process.cwd(), ".env");

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
// Don't include `.env.local` for `test` environment
// since normally you expect tests to produce the same
// results for everyone
const dotenvFiles =
  NODE_ENV !== "test"
    ? [
        `${root}.${NODE_ENV}.local`,
        `${root}.${NODE_ENV}`,
        `${root}.local`,
        root,
      ]
    : [`${root}.${NODE_ENV}`, root];

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require("dotenv-expand")(
      require("dotenv").config({
        path: dotenvFile,
      }),
    );
  }
});

export default function getClientEnvironment(config: PhenomicConfig) {
  process.env.PHENOMIC_APP_BASEURL = format(config.baseUrl);
  process.env.PHENOMIC_APP_BASENAME = config.baseUrl.pathname;
  return Object.keys(process.env)
    .filter(key => RE_PHENOMIC.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV,
      },
    );
}
