import path from "path";

import color from "chalk";
import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { match, RouterContext } from "react-router";
import { createRouteFromReactElement } from "react-router/lib/RouteUtils";
import createURL from "@phenomic/api-client/lib/url";

import Provider from "../components/Provider";
import createStore from "../shared/store";
import performQuery from "../shared/performQuery";
import { encode, decode } from "../shared/QueryString";
import renderHTML from "../renderHTML";
import type { StoreType } from "../shared/store";

const debug = require("debug")("phenomic:plugin:renderer-react");

function getMatch({ routes, location }) {
  return new Promise((resolve, reject) => {
    match(
      { routes, location: `/${location}` },
      (error, redirectLocation, renderProps) => {
        if (error) reject(error);
        else resolve({ renderProps, redirectLocation });
      }
    );
  });
}

function staticRenderToString(
  config: PhenomicConfig,
  store: StoreType,
  { renderProps }: { renderProps: Object },
  renderHTML: typeof renderHTML,
  assets: PhenomicAssets
) {
  return renderHTML(
    {
      WrappedApp: () => (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ),
      renderAsObject: (UserWrappedApp: React.Element<any>) => ({
        main: ReactDOMServer.renderToString(UserWrappedApp),
        state: store.getState(),
        assets
      })
    },
    config
  );
}

const _renderStatic = async (
  config: PhenomicConfig,
  {
    app,
    assets,
    location
  }: {|
    app: PhenomicAppType,
    assets: PhenomicAssets,
    location: string
  |}
) => {
  debug(location, "server renderering");

  const routes = createRouteFromReactElement(app.routes);
  const store = createStore();
  const { renderProps, redirectLocation } = await getMatch({
    routes,
    location
  });

  // debug(location, "renderProps", renderProps);

  // debug(location, "phenomic api store is going to be filled");
  const phenomicApiContainers = renderProps.components.filter(
    item => item && typeof item.getQueries === "function"
  );
  await Promise.all(
    phenomicApiContainers.map(item => {
      const queries = item.getQueries(renderProps);
      return performQuery(
        store,
        Object.keys(queries).map(key => encode(queries[key]))
      );
    })
  );
  // debug(location, "phenomic api store has been prepared");

  const containers = renderProps.components.filter(
    item => item && typeof item.getInitialProps === "function"
  );
  // we should only have one
  if (containers.length > 1) {
    throw Error(
      "Only a single async container can be used on a given route (`static async getInitialProps`), found " +
        containers.length
    );
  }
  await Promise.all(
    containers.map(async item => {
      renderProps.params.__initialPropsForSSR = await item.getInitialProps(
        renderProps
      );
    })
  );

  let contents;
  try {
    contents = await staticRenderToString(
      config,
      store,
      { renderProps, redirectLocation },
      renderHTML,
      assets
    );
  } catch (err) {
    console.error();
    console.error(
      `${color.red(
        "An error occured when Phenomic tried to render"
      )} ${color.yellow(location)}`
    );
    console.error();
    throw err;
  }
  const state = store.getState();
  // don't prepend index.html if location already have .html
  const filepath = location.match(/\.html$/)
    ? location
    : path.join(location, "index.html");
  return [
    { path: filepath, contents },
    ...Object.keys(state).map(key => ({
      path: createURL({ root: "phenomic", ...decode(key) }),
      contents: JSON.stringify(state[key].node)
    }))
  ];
};

const renderStatic = (config: PhenomicConfig) => (args: {|
  app: PhenomicAppType,
  assets: PhenomicAssets,
  location: string
|}) => _renderStatic(config, args);

export default renderStatic;
