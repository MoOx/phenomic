import render from "./render/client"

export type AppType = {
  routes: React$Element<any>,
  Html?: (props: PhenomicHtmlPropsType) => React$Element<*>,
}

export default (
  routes: () => React$Element<any>,
  Html?: PhenomicHtmlType,
): AppType => {
  if (typeof window !== "undefined") {
    render(routes)
  }
  return {
    routes: routes(),
    Html,
  }
}
