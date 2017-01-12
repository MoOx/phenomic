const sm = require("sitemap")

module.exports = function() {
  return {
    type: "build",
    getFile(build) {
      /* sm.createSitemap({
        hostname: "https://putaindecode.io",
        cacheTime: 600000,
        urls: urls.map(url => ({ url })),
      })
      .toXML((error, xml) => {
        if(error) {
          reject(error)
        } else {
          resolve(xml)
        }
      })*/
    },
  }
}
