export const defaultMetas = [
  `<meta charset="utf-8" />`,
  `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
  `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
]

export default ({ baseUrl, css } = {}) => {
  const metas = [ ...defaultMetas ]

  if (css) {
    metas.push(
      `<link rel="stylesheet" href="${ baseUrl.path }statinamic-client.css" />`
    )
  }

  return metas
}
