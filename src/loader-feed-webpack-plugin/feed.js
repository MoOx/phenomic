// @todo @ flow

import url from "url"

import RSS from "rss"

export default (options = {}) => {
  const {
    feedOptions,
    destination,
    collection,
    xmlOptions,
  } = {
    feedOptions: {},
    ...options,
  }

  if (!feedOptions.site_url) {
    throw new Error("feed site_url must be configured")
  }

  if (feedOptions.feed_url == null) {
    feedOptions.feed_url = url.resolve(feedOptions.site_url, destination)
  }

  const feed = new RSS(feedOptions)
  collection.forEach((item) => {
    feed.item({
      ...item,
      url: item.__url ?
        url.resolve(
          feedOptions.site_url,
          item.__url
        ) :
        undefined
      ,
    })
  })

  return feed.xml(xmlOptions)
}
