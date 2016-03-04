import remark from "remark"
import stripMd from "strip-markdown"
import { prune }  from "underscore.string"

const defaultOpts = {
  pruneLength: 140,
  pruneString: "…",
}

export default function description(mdObject, opts = {}) {
  opts = { ...defaultOpts, ...opts }

  if (opts.pruneLength < 10) {
    console.warn(
      `You defined 'description.pruneLength' of collection-loader ` +
      `with an zero value. This does not make sense, ` +
      `so the default value ${ defaultOpts.pruneLength } has been used.`
    )

    opts.pruneLength = defaultOpts.pruneLength
  }

  // Don't touch mdObject if there is a
  // description field in frontmatter
  if (mdObject.head.description) {
    return mdObject
  }

  let description = remark.use(stripMd).process(mdObject.rawBody)

  description = prune(description, opts.pruneLength, opts.pruneString)

  description =
    description && description.length > 0
    ? description
    : null

  return {
    ...mdObject,
    head: {
      ...mdObject.head,
      description,
    },
  }
}
