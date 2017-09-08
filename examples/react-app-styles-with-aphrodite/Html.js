import * as React from "react";
import { StyleSheetServer } from "aphrodite/no-important";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const {
    html: { Main, State, Script },
    css
  } = StyleSheetServer.renderStatic(() => render(<App />));

  return (
    <html>
      <head>
        <style data-aphrodite>{css.content}</style>
      </head>
      <body>
        <Main />
        <State />
        <script
          dangerouslySetInnerHTML={{
            __html: `window._aphrodite = ${JSON.stringify(
              css.renderedClassNames
            )}`
          }}
        />
        <Script />
      </body>
    </html>
  );
};
