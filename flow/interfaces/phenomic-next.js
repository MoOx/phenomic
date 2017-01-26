// @flow

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
  bundler: () => PhenomicBundler,
  renderer: () => PhenomicRenderer,
  port?: number,
}

export type PhenomicBundler = {}

export type PhenomicRenderer = {}

export type PhenomicContentFile = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string,
}

export type PhenomicTransformPlugin = {
  name: string,
  type: "transform",
  supportedFileTypes: Array<string>,
  transform:
    (file: PhenomicContentFile, fileContents: string) => Promise<Object> | Object,
}

export type PhenomicAPIPlugin = {
  name: string,
  type: "api",
  define: (api: express$Application, db: PhenomicDB) => mixed,
}

export type PhenomicCollectorPlugin = {
  name: string,
  type: "collector",
  collect: (file: mixed) => Array<mixed>,
}

export type PhenomicPlugin =
  PhenomicTransformPlugin |
  PhenomicAPIPlugin |
  PhenomicCollectorPlugin

export type PhenomicPlugins = Array<PhenomicPlugin>

export type PhenomicPreset = {
  plugins?: PhenomicPlugins,
  presets?: PhenomicPresets,
}

export type PhenomicInputPreset = {
  plugins?: Array<(arg: ?any) => PhenomicPlugin>,
  presets?: Array<PhenomicInputPreset>,
}

export type PhenomicPresets = Array<PhenomicPreset>

export type PhenomicExtensions = PhenomicPreset

export type PhenomicConfig = {
  path: string,
  outdir: string,
  bundler: PhenomicBundler,
  renderer: PhenomicRenderer,
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
