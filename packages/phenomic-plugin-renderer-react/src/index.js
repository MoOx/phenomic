import renderHTML from "./server/renderHTML"
import renderServer from "./render/server"
import getRoutes from "./server/getRoutes"

export default function() {
  return {
    name: "phenomic-plugin-renderer-react",
    renderServer,
    renderHTML,
    getRoutes,
  }
}
