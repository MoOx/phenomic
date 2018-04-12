// @flow

// @todo sitemap
// import sm from "sitemap"

const sitemap: PhenomicPluginModule<{}> = () => {
  return {
    name: "@phenomic/plugin-sitemap"
    /*
    getFile() {
      sm.createSitemap({
        hostname: ROOT,
        cacheTime: 600000,
        urls: urls.map((url) => ({ url })),
      })
      .toXML((error, xml) => error ? reject(error) : resolve(xml))
    }
    */
  };
};

export default sitemap;
