// @flow

import * as React from "react";
import Head from "react-helmet";
import { AppRegistry } from "react-native-web";

const Html = ({ App, render }: PhenomicHtmlPropsType) => {
  AppRegistry.registerComponent("App", () => App);
  const app = AppRegistry.getApplication("App");
  const { Main, State, Script, Style } = render(app.element);
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        {helmet.base.toComponent()}
        {app.getStyleElement()}
        <Style />
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};

export default Html;
