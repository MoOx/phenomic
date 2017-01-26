// @todo sitemap
// import sm from "sitemap"

export default function() {
  return {
    name: "phenomic-plugin-sitemap",
    type: "build",
    getFile() {
      /*
      sm.createSitemap({
        hostname: ROOT,
        cacheTime: 600000,
        urls: urls.map((url) => ({ url })),
      })
      .toXML((error, xml) => error ? reject(error) : resolve(xml))
      */
    },
  }
}
