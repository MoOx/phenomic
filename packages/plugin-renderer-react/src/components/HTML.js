import * as React from "react";

const Html: PhenomicHtmlType = ({ App, render }: PhenomicHtmlPropsType) => {
  const { Main, State, Script, Style } = render(<App />);
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Style />
      </head>
      <body>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};

export default Html;
