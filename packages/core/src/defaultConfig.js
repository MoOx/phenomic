// @flow

import normalizeBaseUrl from "./configuration/normalize-base-url.js";

const defaultConfig: PhenomicConfig = {
  baseUrl: normalizeBaseUrl("http://localhost"),
  path: process.cwd(),
  content: { content: ["**/*"] },
  outdir: "dist",
  port: 3333,
  socketPort: 3334,
  bundleName: "phenomic.main",
  db: {},
  plugins: []
};
export default defaultConfig;
