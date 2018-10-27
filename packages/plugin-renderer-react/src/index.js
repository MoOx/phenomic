// @flow

import renderDevServer from "./server/dev-server";
import renderStatic from "./server/static";
import getRoutes from "./server/getRoutes";
import resolveURLs from "./resolveURLs";

const rendererReact: PhenomicPluginModule<{}> = (config: PhenomicConfig) => {
  return {
    name: "@phenomic/plugin-renderer-react",
    getRoutes,
    resolveURLs,
    renderDevServer: renderDevServer(config),
    renderStatic: renderStatic(config),
  };
};

export default rendererReact;
