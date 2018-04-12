// @flow

import * as React from "react";
import { renderStaticOptimized } from "glamor/server";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html, Main, State, Script } = render(<App />);
  const { css, ids } = renderStaticOptimized(() => html);

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
            __html: `window._glam = ${JSON.stringify(ids)}`
          }}
        />
        <Script />
      </body>
    </html>
  );
};
