// @flow

type RouterPropsType = {
  location: {
    pathname: string,
    search: string,
    hash: string,
  }
}

// we skip scroll update if only hash changes
const shouldUpdateScroll =
(prevProps: RouterPropsType | null, props: RouterPropsType): boolean => {
  if (prevProps) {
    const prev = prevProps.location
    const curr = props.location
    // if "page" is the same we don't scroll
    if (prev.pathname + prev.search === curr.pathname + curr.search) {
      // except if hash is empty, because it should scroll if
      // - same url, without hash
      // - hash to no hash
      // both cases are kind of a "back to top"
      if (curr.hash === "") {
        return true
      }

      return false
    }
  }

  return true
}

export default shouldUpdateScroll
