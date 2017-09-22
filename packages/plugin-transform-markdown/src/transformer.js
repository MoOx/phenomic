import unified from "unified";
import markdown from "remark-parse";
import toc from "remark-toc";
import remarkRehype from "remark-rehype";
import raw from "rehype-raw";
import slug from "rehype-slug";
import autoLinkHeadings from "rehype-autolink-headings";
import highlight from "rehype-highlight";
import html from "rehype-stringify";
import rehype2react from "rehype-react";

// here we optimize structure just a little to have to smallest json possible
const createElement = (component, props, children) => {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {})
  };
};

export default (config?: PhenomicConfig, body: string) => {
  const processor = unified()
    .use(markdown)
    .use(toc)
    .use(remarkRehype, { allowDangerousHTML: true })
    .use(raw)
    .use(slug)
    .use(autoLinkHeadings)
    .use(highlight);

  const useReact =
    config &&
    config.plugins &&
    config.plugins.find(p => p.name === "@phenomic/plugin-renderer-react");

  if (!useReact) {
    processor.use(html);
  } else {
    processor.use(rehype2react, { createElement });
  }

  return processor.processSync(body);
};
