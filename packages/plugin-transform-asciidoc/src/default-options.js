// @flow

const defaultOptions = {
  output: "html",
  plugins: [
    [require("rehype-parse"), { fragment: true }],
    require("rehype-slug"),
    require("rehype-autolink-headings"),
    require("rehype-highlight"),
  ],
};

export default defaultOptions;
