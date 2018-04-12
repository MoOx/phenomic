// @flow

import flatten from "lodash.flatten";

const debug = require("debug")("phenomic:plugin:api-related-content");

const apiRelatedContent: PhenomicPluginModule<{}> = () => {
  return {
    name: "@phenomic/plugin-api-related-content",
    extendAPI({ apiServer }) {
      // $FlowFixMe flow is lost with async function for express
      apiServer.get("/related/:path/limit-:limit/*.json", async function(
        req,
        res
      ) {
        debug(req.url, JSON.stringify(req.params));
        try {
          const limit = parseInt(res.params.limit);
          const post = await req.db.get([req.params.path], req.params[0]);
          const lists = await Promise.all([
            ...post.value.tags.map(tag =>
              req.db.getList(
                req.params.path,
                {
                  limit: limit + 1
                },
                "tags",
                tag
              )
            ),
            req.db.getList(req.params.path, { limit: limit + 1 })
          ]);
          const flattenedList = flatten(lists);
          const listWithoutCurrentPost = flattenedList.filter(
            item => item.id !== post.value.id
          );
          res.json(listWithoutCurrentPost);
        } catch (error) {
          res.status(404).end();
        }
      });
    }
  };
};

export default apiRelatedContent;
