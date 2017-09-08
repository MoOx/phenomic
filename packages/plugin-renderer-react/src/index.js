import renderDevServer from "./server/dev-server";
import renderStatic from "./server/static";
import getRoutes from "./server/getRoutes";

export default function() {
  return {
    name: "@phenomic/plugin-renderer-react",
    getRoutes,
    renderDevServer,
    renderStatic
  };
}
