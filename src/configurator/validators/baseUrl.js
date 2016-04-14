// @flow
import url from "url"

export default function(
  { pkg, config }: { pkg: Object, config: PhenomicConfig }
): void {
  const devUrl = `http://${ config.devHost }:${ config.devPort }/`
  const prodBaseUrl = url.parse(pkg.homepage ? pkg.homepage : devUrl)
  config.baseUrl = config.production
    ? prodBaseUrl
    : {
      ...url.parse(devUrl),
      // get base from prod url
      pathname: prodBaseUrl.path ? prodBaseUrl.path : "/",
    }

  // ensure trailing slash
  if (
    config.baseUrl.pathname &&
    !config.baseUrl.pathname.endsWith("/")
  ) {
    config.baseUrl.pathname = config.baseUrl.pathname + "/"
  }

  // update config.baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  config.baseUrl = { ... url.parse(url.format(config.baseUrl)) }

  // Set basename to process.env for universal usage
  process.env.PHENOMIC_PATHNAME = config.baseUrl.pathname
}
