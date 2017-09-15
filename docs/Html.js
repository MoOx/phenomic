import * as React from "react";
import Head from "react-helmet";
import { StyleSheet } from "react-native-web";

const Html = ({ App, render }: PhenomicHtmlPropsType) => {
  const { Main, State, Script, Style } = render(<App />);
  const helmet = Head.renderStatic();
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.meta.toComponent()}
        {helmet.title.toComponent()}
        {helmet.base.toComponent()}
        <Style />
        {StyleSheet.getStyleSheets().map(({ id, textContent }, i) => (
          <style
            key={i}
            id={id}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        ))}
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
