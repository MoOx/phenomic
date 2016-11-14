// @flow

/*
 * Get JSON stats
 * Flatten chunk name
 * Sort a-z => predictable chunks order
 */
export default function(assets: WebpackAssetsFiles): PhenomicAssetsFiles {
  const assetsFiles = { css: [], js: [] }

  Object.keys(assets)
    .reduce((result, key) => {
      const chunkAssets = assets[key]
      return result.concat(chunkAssets)
    }, [])
    .sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : -1)
    .forEach((name) => {
      if (name.endsWith(".js")) {
        assetsFiles.js.push(name)
      }
      else if (name.endsWith(".css")) {
        assetsFiles.css.push(name)
      }
    })

  return assetsFiles
}
