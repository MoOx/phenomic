import * as React from "react";
import { renderStatic } from "glamor/server";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html: { Main, State, Script }, css, ids } = renderStatic(() =>
    render(<App />)
  );

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
