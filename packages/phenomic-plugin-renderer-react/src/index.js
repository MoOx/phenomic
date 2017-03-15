import renderHTML from "./server/renderHTML"
// import render from "./server/render"
import getRoutes from "./server/getRoutes"

export default function() {
  return {
    name: "phenomic-plugin-renderer-react",
    type: "renderer",
    renderHTML,
    // render,
    getRoutes,
  }
}
