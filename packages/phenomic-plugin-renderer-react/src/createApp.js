import render from "./render/client"

export type AppType = {
  routes: React$Element<any>,
}

export default (routes: () => React$Element<any>): AppType  => {
  if (typeof window !== "undefined") {
    render(routes)
  }
  return {
    routes: routes(),
  }
}
