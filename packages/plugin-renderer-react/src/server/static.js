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

const debug = require("debug")("phenomic:plugin:react");

function getMatch({ routes, location }) {
  return new Promise((resolve, reject) => {
    match(
      { routes, location: `/${location}` },
      (error, redirectLocation, renderProps) => {
        error ? reject(error) : resolve({ renderProps, redirectLocation });
      }
    );
  });
}

function staticRenderToString(
  config: PhenomicConfig,
  store: StoreType,
  { renderProps }: { renderProps: Object },
  renderHTML: PhenomicPluginRenderHTMLType,
  assets: PhenomicAssets
) {
  return renderHTML({
    config,
    props: {
      WrappedApp: () => (
        <Provider fetch={fetch} store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      ),
      renderAsObject: (UserWrappedApp: React.Element<any>) => ({
        main: ReactDOMServer.renderToString(UserWrappedApp),
        state: store.getState(),
        assets
      })
    }
  });
}

const renderStatic: PhenomicPluginRenderStaticType = async ({
  config,
  app,
  assets,
  phenomicFetch,
  location
}) => {
  debug("server renderering");

  const routes = createRouteFromReactElement(app.routes);
  const store = createStore();
  const { renderProps, redirectLocation } = await getMatch({
    routes,
    location
  });
  const containers = renderProps.components.filter(
    item => item && typeof item.getQueries === "function"
  );
  await Promise.all(
    containers.map(item => {
      const queries = item.getQueries(renderProps);
      return performQuery(
        store,
        phenomicFetch,
        Object.keys(queries).map(key => encode(queries[key]))
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

export default renderStatic;
