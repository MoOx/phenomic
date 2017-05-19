import render from "./render/client"
import type { HtmlType } from "./components/HTML"

export type AppType = {
  routes: React$Element<any>,
  Html?: HtmlType,
}

export default (routes: () => React$Element<any>, Html?: HtmlType): AppType => {
  if (typeof window !== "undefined") {
    render(routes)
  }
  return {
    routes: routes(),
    Html,
  }
}
