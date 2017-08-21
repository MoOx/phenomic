import React from "react";
import { ServerStyleSheet } from "styled-components";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const sheet = new ServerStyleSheet();
  const { Body } = render(sheet.collectStyles(<App />));

  return (
    <html>
      <head>
        {sheet.getStyleElement()}
      </head>
      <Body />
    </html>
  );
};
