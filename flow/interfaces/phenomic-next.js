type PhenomicDB = {
  destroy: () => Promise<*>,
  put: (sub: string | Array<string>, key: string, value: any) => Promise<*>,
  get: (sub: string | Array<string>, key: string) => Promise<*>,
  getPartial: (sub: string | Array<string>, key: string) => Promise<*>,
  getList: (sub: string | Array<string>, config: LevelStreamConfig, filter: ?string, filterValue: string) => Promise<*>,
}

type PhenomicInputConfig = PhenomicInputPreset & {
  path?: string,
  outdir?: string,
  bundler: () => PhenomicBundler,
  renderer: () => PhenomicRenderer,
  port?: number,
}

type PhenomicBundler = {}

type PhenomicRenderer = {}

type PhenomicContentFile = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string,
}

type PhenomicTransformPlugin = {
  type: "transform",
  supportedFileTypes: Array<string>,
  transform(file: PhenomicContentFile, fileContents: string): Promise<any> | any,
}

type PhenomicAPIPlugin = {
  type: "api",
  define(api: express$Application, db: PhenomicDB): mixed,
}

type PhenomicCollectorPlugin = {
  type: "collector",
  collect(file: mixed): Array<mixed>,
}

type PhenomicPlugin =
  PhenomicTransformPlugin |
  PhenomicAPIPlugin |
  PhenomicCollectorPlugin;

type PhenomicPlugins = Array<PhenomicPlugin>

type PhenomicPreset = {
  plugins?: PhenomicPlugins,
  presets?: PhenomicPresets,
}

type PhenomicInputPreset = {
  plugins?: Array<(arg: ?any) => PhenomicPlugin>,
  presets?: Array<PhenomicInputPreset>,
}

type PhenomicPresets = Array<PhenomicPreset>

type PhenomicExtensions = PhenomicPreset

type PhenomicConfig = {
  path: string,
  outdir: string,
  bundler: PhenomicBundler,
  renderer: PhenomicRenderer,
  port: number,
  plugins: Array<PhenomicPlugin>,
}

type PhenomicQueryConfig = {
  collection: string,
  id?: string,
  after?: string,
  by?: string,
  value?: string,
  limit?: number
}

type PhenomicRoute = {
  path: string,
  params?: { [key: string]: any },
  getQueries: (props: { params: { [key: string]: any }}) => { [key: string]: PhenomicQueryConfig },
}

type PhenomicFetch = (config: PhenomicQueryConfig | string) => Promise<any>
