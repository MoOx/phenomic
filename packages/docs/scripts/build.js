import path from "path"

import phenomic from "phenomic"
import phenomicWebpack from "phenomic-webpack"
import phenomicReact from "phenomic-react"
import transformMarkdown from "phenomic-plugin-transform-markdown"
import directoryCollector from "phenomic-plugin-directory-collector"

phenomic.build({
  path: path.resolve(__dirname, ".."),
  outdir: path.resolve(__dirname, "../dist"),
  bundler: phenomicWebpack,
  renderer: phenomicReact,
  plugins: [
    transformMarkdown,
    directoryCollector,
  ],
})
