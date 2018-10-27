// @flow

const defaultOptions = {
  output: "html",
  // Below "html" means "something that looks like html"
  // The idea is to allow any kind of tags
  // in order to map them later and allow custom react components in place of real
  // html tags
  plugins: [
    // first markdown
    require("remark-parse"),
    require("remark-toc"),
    //
    // List of language Here
    // https://github.com/atom/highlights/tree/master/deps
    // if language is not in the list, use `additionalLangs: ["language-{yourlanguage}"]`
    // and add this package (`language-{yourlanguage}`) to your node_modules
    //
    // To generated a CSS theme,
    // https://github.com/MoOx/atom-syntax-theme-to-highlights-css
    //
    require("remark-highlights"),
    // markdown to html ast
    // this is to allow "raw" things (html in md and md in html)
    [require("remark-rehype"), { allowDangerousHTML: true }],
    require("rehype-raw"),
    // then some traditional plugins
    require("rehype-slug"),
    require("rehype-autolink-headings"),
  ],
};

export default defaultOptions;
