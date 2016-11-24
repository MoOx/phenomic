// @flow

type RouterPropsType = {
  location: {
    pathname: string,
    search: string,
    hash: string,
  }
}

// only scroll when complete url changes
// (except for hash change - this example provide a natural feeling when you
// use simple link to internal anchor (eg: a table of content that use hashes
// inside a page))
const shouldUpdateScroll =
(prevProps: RouterPropsType | null, props: RouterPropsType): boolean => {
  if (prevProps) {
    const prev = prevProps.location
    const curr = props.location
    // if "page" is the same we don't scroll
    if (prev.pathname + prev.search === curr.pathname + curr.search) {
      // except if hash is empty, because it should keep browser natural
      // behavior if:
      // - same url, without considering the hash
      // - previous url contains a hash to an new url does not
      // both cases are kind of a "back to top" scenario
      if (curr.hash === "") {
        return true
      }

      return false
    }
  }

  return true
}

export default shouldUpdateScroll
