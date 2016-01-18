export const defaultMetas = [
  `<meta charset="utf-8" />`,
  `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
  `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
]

export default (env, { baseUrl } = {}) => {
  const metas = [ ...defaultMetas ]

  if (env === "static") {
    metas.push(
      `<link rel="stylesheet" href="${ baseUrl.path }statinamic-client.css" />`
    )
  }

  return metas
}
