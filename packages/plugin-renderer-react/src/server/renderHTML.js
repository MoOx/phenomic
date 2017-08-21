import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import DefaultHtml from "../components/HTML";

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-bind */

const DefaultDevContent = () =>
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
  </div>;
/* eslint-enable react-native/no-inline-styles */

const renderHtmlPropsForDevServer = {
  WrappedApp: DefaultDevContent,
  renderAsObject: UserWrappedApp => ({
    main: ReactDOMServer.renderToString(UserWrappedApp),
    state: null,
    script: undefined
  })
};

const isNotFoundError = e => e.code === "MODULE_NOT_FOUND";

const renderHTML: PhenomicPluginRenderHTMLType = ({
  config,
  props = renderHtmlPropsForDevServer
}) => {
  let Html: PhenomicHtmlType;
  try {
    // $FlowFixMe Shushhhh!
    Html = require(path.join(config.path, "Html.js")).default;
  } catch (e) {
    if (!isNotFoundError(e)) {
      throw e;
    }
    console.error("Html component cannot be used", e.toString());
    Html = DefaultHtml;
  }

  /* eslint-disable react/prop-types */
  return (
    "<!DOCTYPE html>" +
    ReactDOMServer.renderToStaticMarkup(
      <Html
        App={props.WrappedApp}
        render={UserWrappedApp => {
          const { main, state, script } = props.renderAsObject(UserWrappedApp);
          const Main = () =>
            <div
              id="PhenomicRoot"
              dangerouslySetInnerHTML={{ __html: main || null }}
            />;
          const State = () =>
            state &&
            <script
              id="PhenomicHydration"
              type="text/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(state)
              }}
            />;
          // eslint-disable-next-line react/no-multi-comp
          const Script = () =>
            <script src={script || `/${config.bundleName}.js`} async />;

          return {
            Main,
            State,
            Script,
            Body: props =>
              <body {...props}>
                <Main />
                <State />
                <Script />
              </body>
          };
        }}
      />
    )
  );
};

export default renderHTML;
