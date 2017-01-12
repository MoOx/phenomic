const RSS = require("rss")

module.exports = function() {
  return {
    type: "api",
    async build(fetch, writeFile) {
      const feed = fetch("/feed.xml")
      return writeFile("feed.xml", feed)
    },
    define(api) {
      api.get("/feed.xml", async function(req, res) {
        const rss = new RSS({
          feed_url: "https://putaindecode.io",
        })
        const posts = await req.db.getList({ collection: "posts" })
        const postsFromLastYear = posts.filter(post => Date.now() - new Date(post.date).getTime() < (1000 * 60 * 60 * 24 * 365))
        postsFromLastYear
          .forEach(post => {
            rss.item({
              title: post.title,
              url: "https://putaindecode.io" + post.path,
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
