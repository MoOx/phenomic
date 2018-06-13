// @flow

import * as React from "react";

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html, Main, State, Script, Style, assets } = render(<App />);

  const styles =
    process.env.PHENOMIC_ENV !== "static" ? (
      <Style />
    ) : (
      <style
        // @idea use https://github.com/addyosmani/critical
        dangerouslySetInnerHTML={{
          __html: Object.keys(assets)
            .reduce((acc, name) => acc.concat(assets[name]), [])
            .filter(asset => asset.endsWith(".css"))
            .map(css =>
              // @todo try to get /dist/ from config somehow
              require("fs").readFileSync("./dist/" + css, { encoding: "utf8" })
            )
            .join("")
            .replace(/\n/, "")
        }}
      />
    );

  return (
    <html>
      <head>{styles}</head>
      <body>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};
