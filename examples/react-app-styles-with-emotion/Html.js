import * as React from "react";
import { extractCritical } from "emotion-server";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html, Main, State, Script } = render(<App />);
  const { css, ids } = extractCritical(html);

  return (
    <html>
      <head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
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
