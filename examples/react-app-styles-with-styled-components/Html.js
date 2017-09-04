import React from "react";
import { ServerStyleSheet } from "styled-components";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const sheet = new ServerStyleSheet();
  const { Main, State, Script } = render(sheet.collectStyles(<App />));

  return (
    <html>
      <head>{sheet.getStyleElement()}</head>
      <body>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};
