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
  }

  return Boolean(prevProps) && hash === ""
}

export default shouldUpdateScroll
