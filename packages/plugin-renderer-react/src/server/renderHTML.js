import React from "react";
import ReactDOMServer from "react-dom/server";

import DefaultHtml from "../components/HTML";

const renderHTML: PhenomicPluginRenderHTMLType = (
  config,
  props = {},
  Html = DefaultHtml
) => {
  const html = (
    <Html
      body={
        <div
          id="PhenomicRoot"
          dangerouslySetInnerHTML={{ __html: props.body || "" }}
        />
      }
      state={
        props.state &&
          <script
            id="PhenomicHydration"
            type="text/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props.state)
            }}
          />
      }
      script={<script src={`/${config.bundleName}.js`} async />}
    />
  );
  return `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(html)}`;
};

export default renderHTML;
