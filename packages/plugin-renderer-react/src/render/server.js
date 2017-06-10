import path from "path";

import color from "chalk";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { match, RouterContext } from "react-router";
import { createRouteFromReactElement } from "react-router/lib/RouteUtils";
import createURL from "@phenomic/api-client/lib/url";

import Provider from "../components/Provider";
import createStore from "../shared/store";
import performQuery from "../shared/performQuery";
import { encode, decode } from "../shared/QueryString";
import renderHTML from "../server/renderHTML";
import type { StoreType } from "../shared/store";
import type { AppType } from "../createApp";

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

function renderToString(
  config: PhenomicConfig,
  store: StoreType,
  { renderProps }: { renderProps: Object },
  renderHTML,
  Html
) {
  const body = ReactDOMServer.renderToString(
    <Provider fetch={fetch} store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );
  return renderHTML(
    config,
    {
      body,
      state: store.getState()
    },
    Html
  );
}

async function renderServer(
  config: PhenomicConfig,
  app: AppType,
  fetch: PhenomicFetch,
  location: string
) {
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
        fetch,
        Object.keys(queries).map(key => encode(queries[key]))
      );
    })
  );
  let contents;
  try {
    contents = await renderToString(
      config,
      store,
      { renderProps, redirectLocation },
      renderHTML,
      app.Html
    );
  } catch (err) {
    console.error();
    console.error(
      `${color.red("An error occured when Phenomic tried to render")} ${color.yellow(location)}`
    );
    console.error();
    throw err;
  }
  const state = store.getState();
  return [
    { path: path.join(location, "index.html"), contents },
    ...Object.keys(state).map(key => ({
      path: createURL({ root: "phenomic", ...decode(key) }),
      contents: JSON.stringify(state[key].node)
    }))
  ];
}

export default renderServer;
