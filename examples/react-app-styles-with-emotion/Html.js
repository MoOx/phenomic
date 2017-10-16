import * as React from "react";
import { extractCritical } from "emotion-server";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html: { Main, State, Script }, css, ids } = extractCritical(render(<App />));

return (
  <html>
    <head>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
    </head>
    <body>
      <Main />
      <State />
      <script
        dangerouslySetInnerHTML={{
          __html: `window._emotion = ${JSON.stringify(ids)}`
        }}
      />
      <Script />
    </body>
  </html>
);
};