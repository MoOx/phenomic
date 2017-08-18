import React from "react";
import ReactDOMServer from "react-dom/server";

import DefaultHtml from "../components/HTML";

/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-no-bind */

const renderHtmlPropsForDevServer = {
  WrappedApp: () => <div>{"Loading..."}</div>,
  renderAsObject: () => ({
    main: "",
    state: null
    // script: null,
  })
};

const renderHTML: PhenomicPluginRenderHTMLType = (
  config,
  props?: PhenomicIntermediateHtmlPropsType = renderHtmlPropsForDevServer,
  Html = DefaultHtml
) => {
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
