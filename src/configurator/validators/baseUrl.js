// @flow
import { parse } from "url"

import normalizeBaseUrl from "../../_utils/normalize-base-url/index.js"

export default function(
  { pkg, config }: { pkg: Object, config: PhenomicConfig }
): void {
  const devUrl = `http://${ config.devHost }:${ config.devPort }/`
  const prodBaseUrl = parse(pkg.homepage ? pkg.homepage : devUrl)
  config.baseUrl = config.production
    ? prodBaseUrl
    : {
      ...parse(devUrl),
      // get base from prod url
      pathname: prodBaseUrl.path ? prodBaseUrl.path : "/",
    }

  config.baseUrl = normalizeBaseUrl(config.baseUrl)

  // Set basename to process.env for universal usage
  process.env.PHENOMIC_USER_PATHNAME = config.baseUrl.pathname
}
