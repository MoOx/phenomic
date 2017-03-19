import renderHTML from "./server/renderHTML"
// import render from "./server/render"
import getRoutes from "./server/getRoutes"

export default function() {
  return {
    name: "phenomic-plugin-renderer-react",
    renderHTML,
    // render,
    getRoutes,
  }
}
