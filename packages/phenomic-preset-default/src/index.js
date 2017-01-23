export default {
  plugins: {
    transform: [
      require("phenomic-plugin-transform-markdown"),
      require("phenomic-plugin-transform-json"),
    ],
    api: [
      require("phenomic-plugin-api-related-content"),
    ],
  },
}
