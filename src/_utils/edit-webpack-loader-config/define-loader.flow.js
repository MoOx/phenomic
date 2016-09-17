export type fileType = {
  test?: any,
  loader?: string,
  loaders?: Array<string>,
}

export type fileTypeWebpack2 = {
  test?: any,
  loaders: Array<loaderDefWebpack2 | string>,
}

export type loaderDefWebpack2 = {
  loader: string,
  query?: Object,
}
