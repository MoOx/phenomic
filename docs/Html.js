import React from "react";
import Head from "react-helmet";
import { StyleSheet } from "react-primitives";

export type HtmlPropsType = {
  body: React$Element<*>,
  state?: React$Element<*>,
  script: React$Element<*>
};

const Html = (props: HtmlPropsType) => {
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <link rel="stylesheet" href="/styles.css" />
        {StyleSheet.getStyleSheets().map(({ id, textContent }) =>
          <style key={id} id={id}>{textContent}</style>
        )}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {props.body}
        {props.state}
        {props.script}
      </body>
    </html>
  );
};

export default Html;
