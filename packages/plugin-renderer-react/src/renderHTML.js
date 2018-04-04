import path from "path";

import * as React from "react";
import ReactDOMServer from "react-dom/server";

import DefaultHtml from "./components/HTML";

const debug = require("debug")("phenomic:plugin:renderer-react");

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-bind */

const isNotFoundError = e => e.code === "MODULE_NOT_FOUND";

type htmlPropsType = {|
  WrappedApp: ReactCompo,
  renderAsObject: (
    app: React$Node
  ) => {
    main: string,
    state?: Object | null,
    assets: PhenomicAssets
  }
|};

const renderHTML = (props: htmlPropsType, config: PhenomicConfig): string => {
  let Html: PhenomicHtmlType;
  try {
    // $FlowFixMe Shushhhh!
    Html = require(path.join(config.path, "Html.js")).default;
  } catch (e) {
    if (!isNotFoundError(e)) {
      throw e;
    }
    debug("Html component cannot be used", e.toString());
    Html = DefaultHtml;
  }

  /* eslint-disable react/prop-types */
  return (
    "<!DOCTYPE html>" +
    ReactDOMServer.renderToStaticMarkup(
      <Html
        App={props.WrappedApp}
        render={UserWrappedApp => {
          const { main, state, assets } = props.renderAsObject(UserWrappedApp);
          const sets: $ReadOnlyArray<string> = Object.keys(assets).reduce(
            (acc, name) => acc.concat(assets[name]),
            []
          );
          const css = sets.filter(asset => asset.endsWith(".css")).shift();
          const js = sets.filter(asset => asset.endsWith(".js")).shift();
          return {
            html: main,
            Main: ({ html = main }) => (
              <div
                id="PhenomicRoot"
                dangerouslySetInnerHTML={{ __html: html || null }}
              />
            ),
            State: () =>
              state && (
                <script
                  id="PhenomicHydration"
                  type="text/json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify(state)
                  }}
                />
              ),
            // eslint-disable-next-line react/no-multi-comp
            Style: () =>
              css ? (
                <link rel="stylesheet" href={config.baseUrl.pathname + css} />
              ) : null,
            Script: () =>
              js ? <script src={config.baseUrl.pathname + js} async /> : null,
            assets
          };
        }}
      />
    )
  );
};

export default renderHTML;
