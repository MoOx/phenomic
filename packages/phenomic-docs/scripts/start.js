const phenomic = require("phenomic")
const path = require("path")

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
