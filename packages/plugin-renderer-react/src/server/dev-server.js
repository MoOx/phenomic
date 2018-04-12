// @flow

import * as React from "react";
import ReactDOMServer from "react-dom/server";

import renderHTML from "../renderHTML";

const DefaultDevContent = () => (
  /* eslint-disable react-native/no-inline-styles */
  <div
    id="phenomic-DevLoader"
    style={{
      color: "red",
      font: "caption",
      fontSize: "2rem",
      padding: "40vh 10vw",
      textAlign: "center"
    }}
  >
    <script
      dangerouslySetInnerHTML={{
        __html: `
    window.onerror = function(e) {
      var devLoader = document.querySelector("#phenomic-DevLoader")
      if (devLoader) { devLoader.innerHTML = e.toString() }
      // only need to use this code once
      window.onerror = null
    }`
      }}
    />
    <noscript>
      {`Phenomic development server requires JavaScript.
      If you want to check our your website works without JavaScript, you need to
      build the static version and server the result.
      You can do this by doing in your terminal:`}
      <pre style={{ textAlign: "left" }}>
        <code>
          {"npm run build" +
            "\n" +
            "npm install -g serve" +
            "\n" +
            "serve dist"}
        </code>
      </pre>
    </noscript>
  </div>
);
/* eslint-enable react-native/no-inline-styles */

const _renderDevServer = (
  config,
  {
    assets
    // location
  }
) =>
  renderHTML(
    {
      WrappedApp: DefaultDevContent,
      renderAsObject: UserWrappedApp => ({
        main:
          process.env.PHENOMIC_ENV === "static"
            ? ReactDOMServer.renderToString(UserWrappedApp)
            : ReactDOMServer.renderToStaticMarkup(UserWrappedApp),
        state: null,
        assets
      })
    },
    config
  );

const renderDevServer = (config: PhenomicConfig) => (args: {|
  assets: PhenomicAssets,
  location: string
|}) => _renderDevServer(config, args);

export default renderDevServer;
