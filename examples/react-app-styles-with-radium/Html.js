// @flow

import * as React from "react";
import { StyleRoot } from "radium";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { Main, State, Script } = render(
    <StyleRoot>
      <App />
    </StyleRoot>,
  );

  return (
    <html>
      <body>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};
