export type PhenomicDB = {
  destroy: () => Promise<*>,
  put: (sub: string | Array<string>, key: string, value: any) => Promise<*>,
  get: (sub: string | Array<string>, key: string) => Promise<*>,
  getPartial: (sub: string | Array<string>, key: string) => Promise<*>,
  getList:
    (
      sub: string | Array<string>,
      config: LevelStreamConfig,
      filter: ?string,
      filterValue: string
    ) => Promise<*>,
}

export type PhenomicInputConfig = PhenomicInputPreset & {
  path?: string,
  outdir?: string,
  port?: number,
}

export type PhenomicContentFile = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string,
}

export type PhenomicPlugin = {
  name: string,
  supportedFileTypes: Array<string>,
  transform: (file: PhenomicContentFile, fileContents: string) => Promise<Object> | Object,
  define: (api: express$Application, db: PhenomicDB) => mixed,
  collect: (file: mixed) => Array<mixed>,
}

export type PhenomicPlugins = Array<PhenomicPlugin>

export type PhenomicInputPreset = {
  plugins?: Array<(arg: ?any) => PhenomicPlugin>,
  presets?: Array<PhenomicInputPreset>,
}

export type PhenomicPresets = Array<PhenomicPreset>

export type PhenomicExtensions = PhenomicPreset

export type PhenomicConfig = {
  path: string,
  outdir: string,
  port: number,
  plugins: Array<PhenomicPlugin>,
}

export type PhenomicQueryConfig = {
  collection: string,
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

export type PhenomicFetch =
  (config: PhenomicQueryConfig | string) => Promise<any>
