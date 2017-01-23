import path from "path"

import phenomic from "phenomic"

phenomic.start({
  path: path.resolve(__dirname, ".."),
  outdir: path.resolve(__dirname, "../dist"),
  bundler: require("phenomic-webpack"),
  renderer: require("phenomic-react"),
  plugins: [
    require("phenomic-plugin-transform-markdown"),
    require("phenomic-plugin-directory-collector"),
  ],
})
