import transformMarkdown from "phenomic-plugin-transform-markdown"
import transformJson from "phenomic-plugin-transform-json"
import apiRelatedContent from "phenomic-plugin-api-related-content"

export default {
  plugins: {
    transform: [
      transformMarkdown,
      transformJson,
    ],
    api: [
      apiRelatedContent,
    ],
  },
}
