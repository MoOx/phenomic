import bundlerWebpack from "phenomic-plugin-bundler-webpack"
import rendererReact from "phenomic-plugin-renderer-react"
import directoryCollector from "phenomic-plugin-directory-collector"
import transformMarkdown from "phenomic-plugin-transform-markdown"
import transformJson from "phenomic-plugin-transform-json"
import apiRelatedContent from "phenomic-plugin-api-related-content"

export default function() {
  return {
    plugins: [
      bundlerWebpack,
      rendererReact,
      transformMarkdown,
      transformJson,
      directoryCollector,
      apiRelatedContent,
    ],
  }
}
