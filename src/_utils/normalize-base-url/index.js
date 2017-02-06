import { parse, format } from "url"

export default (baseUrl: Url) => {
  // ensure trailing slash
  if (
    baseUrl.pathname &&
    !baseUrl.pathname.endsWith("/")
  ) {
    baseUrl.pathname = baseUrl.pathname + "/"
  }

  // update baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  return { ...parse(format({
    // baseUrl cannot just be passed directly
    // https://github.com/facebook/flow/issues/908
    href: baseUrl.href,
    protocol: baseUrl.protocol,
    slashes: baseUrl.slashes,
    auth: baseUrl.auth,
    hostname: baseUrl.hostname,
    port: baseUrl.port,
    host: baseUrl.host,
    pathname: baseUrl.pathname,
    search: baseUrl.search,
    query: baseUrl.query,
    hash: baseUrl.hash,
  })) }
}
