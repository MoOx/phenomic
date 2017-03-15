import path from "path"

import phenomic from "phenomic"
import bundlerWebpack from "phenomic-plugin-bundler-webpack"
import rendererReact from "phenomic-plugin-renderer-react"
import transformMarkdown from "phenomic-plugin-transform-markdown"
import directoryCollector from "phenomic-plugin-directory-collector"

phenomic.build({
  path: path.resolve(__dirname, ".."),
  outdir: path.resolve(__dirname, "../dist"),
  plugins: [
    bundlerWebpack,
    rendererReact,
    transformMarkdown,
    directoryCollector,
  ],
})
