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
  // https://github.com/necolas/react-native-web/issues/504
  const styles = StyleSheet.renderToString().split("</style>");
  const staticStyles = styles[0].replace(
    '<style id="react-native-stylesheet-static">',
    ""
  );
  const mainStyles = styles[1].replace(
    '<style id="react-native-stylesheet">',
    ""
  );
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <link rel="stylesheet" href="/styles.css" />
        <style id="react-native-stylesheet-static">{staticStyles}</style>
        <style id="react-native-stylesheet-static">{mainStyles}</style>
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
