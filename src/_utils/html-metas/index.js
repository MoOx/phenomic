import joinUri from "../join-uri"

export const defaultMetas = [
  `<meta charset="utf-8" />`,
  `<meta http-equiv="X-UA-Compatible" content="IE=edge" />`,
  `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
]

export default ({ baseUrl, css } = {}) => {
  const metas = [ ...defaultMetas ]

  if (css && Array.isArray(css)) {
    css.forEach(fileName => {
      const path = joinUri(baseUrl.pathname, fileName)
      metas.push(
        `<link rel="stylesheet" href="${path}" />`
      )
    })
  }

  return metas
}
