import remark from "remark"
import stripMd from "strip-markdown"
import { prune }  from "underscore.string"

const defaultOpts = {
  pruneLength: 140,
  pruneString: "…",
}

function description(text, opts = {}) {
  opts = { ...defaultOpts, ...opts }

  if (opts.pruneLength === 0) {
    console.warn(
      "You defined 'description.pruneLength' of content-loader " +
      "with an zero value. This does not make sense, " +
      `so the default value ${ defaultOpts.pruneLength } has been used.`
    )

    opts.pruneLength = defaultOpts.pruneLength
  }

  return prune(
    remark()
      .use(stripMd)
      .process(text)
      .toString()
      .replace(/\n+/g, "\n") // Replace multiple new lines with one
      .replace(/\n/g, " ") // Avoid useless new lines
      .trim()
    ,
    opts.pruneLength,
    opts.pruneString
  )
}

// @flow

export default (
  {
    result,
    frontMatter,
    options,
  }: PhenomicContentLoaderPluginInput
): PhenomicCollectionItem => {
  if (result.head && result.head.description) {
    return result
  }
  return {
    ...result,
    head: {
      ...result.head,
      description: description(frontMatter.content, options),
    },
  }
}
