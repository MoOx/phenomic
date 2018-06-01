// @flow

module.exports = {
  baseUrl: "https://phenomic.io/",
  content: {
    content: ["**/*"],
    packages: {
      root: "../packages",
      globs: ["*/package.json", "*/docs/**/*.md"]
    }
  },
  presets: ["@phenomic/preset-react-app"],
  plugins: [
    [
      "@phenomic/plugin-rss-feed",
      {
        feeds: {
          "feed.xml": {
            feedOptions: {
              title: "Phenomic.io",
              description: "Phenomic news"
            },
            query: {
              path: "content/blog",
              limit: 20
            }
          }
        }
      }
    ]
  ],
  db: {
    sortFunctions: {
      showcase: (a, b) => {
        if (a.data.curated && !b.data.curated) return -1;
        if (!a.data.curated && b.data.curated) return 1;

        // more tags first
        if (a.data.showcaseTags.length < b.data.showcaseTags.length) return 1;
        if (a.data.showcaseTags.length > b.data.showcaseTags.length) return -1;

        // blog last
        if (
          a.data.showcaseTags.indexOf("blog") === -1 &&
          b.data.showcaseTags.indexOf("blog") > -1
        ) {
          return -1;
        }

        return 0;
      }
    }
  }
};
