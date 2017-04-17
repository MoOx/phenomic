export type PhenomicDB = {
  destroy: () => Promise<*>,
  put: (sub: string | Array<string>, key: string, value: any) => Promise<*>,
  get: (sub: string | Array<string>, key: string) => Promise<*>,
  getPartial: (sub: string | Array<string>, key: string) => Promise<*>,
  getList:
    (
      sub: string | Array<string>,
      config: LevelStreamConfig,
      filter?: string,
      filterValue: string
    ) => Promise<*>,
}

export type PhenomicInputPlugins = {
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>,
}

export type PhenomicInputConfig = {
  path?: string,
  outdir?: string,
  port?: number,
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>,
}

export type PhenomicContentFile = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string,
}

export type PhenomicPlugin = {
  name: string,
  // transformer
  supportedFileTypes?: Array<string>,
  transform?: (file: PhenomicContentFile, fileContents: string) => Promise<Object> | Object,
  // api
  define?: (api: express$Application, db: PhenomicDB) => mixed,
  // collector
  collect?: (file: mixed) => Array<mixed>,
  // bunder
  buildForPrerendering?: Function,
  getMiddleware?: Function,
  // renderer
  getRoutes?: Function,
  renderServer?: Function,
}

export type PhenomicPlugins = Array<PhenomicPlugin>

export type PhenomicPresets = Array<PhenomicPreset>

export type PhenomicExtensions = PhenomicPreset

export type PhenomicConfig = {
  path: string,
  outdir: string,
  port: number,
  plugins: Array<PhenomicPlugin>,
}

export type PhenomicQueryConfig = {
  collection?: string,
  id?: string,
  after?: string,
  by?: string,
  value?: string,
  limit?: number
}

export type PhenomicRoute = {
  path: string,
  params?: { [key: string]: any },
  getQueries:
    (props: { params: { [key: string]: any }})
    =>
    { [key: string]: PhenomicQueryConfig }
  ,
  collection?: string,
}

// @todo why this inconsistency?
export type PhenomicFetch = IsomorphicFetch | (config: PhenomicQueryConfig) => Promise<any>

export type phenomic$Query = string
export type phenomic$Queries = Array<phenomic$Query>
