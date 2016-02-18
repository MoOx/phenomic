import * as layouts from "../layouts"
import metadata from "./metadata"
import routes from "./routes"

export const client = {
  layouts,
  metadata,
  routes,
}

export const builder = {
  layouts: require.resolve("../layouts"),
  metadata: require.resolve("./metadata"),
  routes: require.resolve("./routes"),
}
