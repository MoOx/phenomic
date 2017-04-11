import RSS from "rss"

const oneYear = 1000 * 60 * 60 * 24 * 365

const debug = require("debug")("phenomic:plugin:rss-feed")

export default function() {
  // @todo fix this ROOT url thing

  return {
    name: "phenomic-plugin-rss-feed",
    async build(fetch: PhenomicFetch, writeFile: Function) {
      // @todo handle this fetch
      // $FlowFixMe handle this fetch
      const feed = fetch("/feed.xml")
      return writeFile("feed.xml", feed)
    },
    define(serverAPI: express$Application) {
      // $FlowFixMe flow is lost with async function for express
      serverAPI.get("/feed.xml", async function(req, res) {
        debug(req.url)
        const rss = new RSS({
          // feed_url: ROOT,
          feed_url: "HTTP://TODO-ROOT/",
        })
        const posts = await req.db.getList({ collection: "posts" })
        const postsFromLastYear = posts.filter((post) => (
          Date.now() - new Date(post.date).getTime() < oneYear
        ))
        postsFromLastYear
          .forEach(post => {
            rss.item({
              title: post.title,
              // url: ROOT + post.path,
              url: "HTTP://TODO-ROOT/" + post.path,
              description: post.content,
              categories: post.tags,
              author: post.author,
              date: post.date,
            })
          })
        res.type("xml").send(rss.xml())
      })
    },
  }
}
