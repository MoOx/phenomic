// https://github.com/wooorm/remark
import remark from "remark";
// https://github.com/wooorm/remark-toc
import toc from "remark-toc";
// https://github.com/wooorm/remark-slug
import slug from "remark-slug";
// https://github.com/ben-eb/remark-autolink-headings
import autoLinkHeadings from "remark-autolink-headings";
// https://github.com/wooorm/remark-html
import html from "remark-html";
// https://github.com/mapbox/remark-react
import reactRenderer from "remark-react";
// for code highlight
import deepmerge from "deepmerge";
import sanitizeGhSchema from "hast-util-sanitize/lib/github.json";

export default (config?: PhenomicConfig, body: string) => {
  const remarkInstance = remark()
    .use(toc)
    .use(slug)
    .use(autoLinkHeadings, {
      // @todo find how to make this options works with remark-react
      content: {
        type: "text",
        value: "#"
      },
      linkProperties: {
        className: "phenomic-HeadingAnchor"
      }
    });

  const useReact =
    config &&
    config.plugins &&
    config.plugins.find(p => p.name === "@phenomic/plugin-renderer-react");

  if (!useReact) {
    remarkInstance.use(html);
  } else {
    remarkInstance.use(reactRenderer, {
      sanitize: deepmerge(sanitizeGhSchema, {
        // remove user-content from github.json to remark-slug work as expected
        clobberPrefix: "",
        // allow code to have className
        attributes: { "*": ["className"] }
      }),
      // we cannot rely on components from here as we are serializing this as
      // json
      // remarkReactComponents: {
      //   code: RemarkLowlight(languages),
      // },
      createElement: (component, props, children) => {
        // here we optimize structure just a little to have to smallest json
        // possible
        return {
          c: children,
          ...(!props
            ? {}
            : Object.keys(props).length === 0 ? {} : { p: props }),
          t: component
        };
      }
    });
  }

  return remarkInstance.processSync(body, { commonmark: true });
};
