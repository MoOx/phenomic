const flatten = require("lodash.flatten")

module.exports = function() {
  return {
    type: "api",
    define(api) {
      api.get("/related/:collection/limit-:limit/*.json", async function(req, res) {
        try {
          const limit = parseInt(res.params.limit)
          const post = await req.db.get([ req.params.collection ], req.params[0])
          const lists = await Promise.all([
            ...post.value.tags.map(tag => req.db.getList(req.params.collection, { limit: limit + 1, lt, reverse }, "tags", tag)),
            db.getList(req.params.collection,  { limit: limit + 1 })
          ])
          const flattenedList = flatten(lists)
          const listWithoutCurrentPost = flattenedList.filter(item => item.id !== post.value.id)
          res.json(listWithoutCurrentPost)
        } catch(error) {
          res.status(404).end()
        }
      })
    },
  }
}
