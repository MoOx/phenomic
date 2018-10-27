// @flow

import fs from "fs";

import * as React from "react";

// memory to avoid reading a css file already read
// @todo try to get ./dist/ from config somehow
const stylesMemory = {};
const readCssFile = css => {
  if (!stylesMemory[css])
    stylesMemory[css] = fs.readFileSync("./dist/" + css, { encoding: "utf8" });
  return stylesMemory[css];
};

export default ({ App, render }: PhenomicHtmlPropsType) => {
  const { html, Main, State, Script, Style, assets } = render(<App />);

  return (
    <html>
      <head>
        {process.env.PHENOMIC_ENV !== "static" ? (
          <Style />
        ) : (
          <style
            // @idea use https://github.com/addyosmani/critical
            dangerouslySetInnerHTML={{
              __html: Object.keys(assets)
                .reduce((acc, name) => acc.concat(assets[name]), [])
                .filter(asset => asset.endsWith(".css"))
                .map(css => readCssFile(css))
                .join(""),
            }}
          />
        )}
      </head>
      <body>
        <Main />
        <State />
        <Script />
      </body>
    </html>
  );
};
