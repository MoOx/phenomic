export type PhenomicDB = {
  destroy: () => Promise<*>,
  put: (sub: string | Array<string>, key: string, value: any) => Promise<*>,
  get: (sub: string | Array<string>, key: string) => Promise<*>,
  getPartial: (sub: string | Array<string>, key: string) => Promise<*>,
  getList: (
    sub: string | Array<string>,
    config: LevelStreamConfig,
    filter?: string,
    filterValue: string
  ) => Promise<*>
};

export type PhenomicInputPlugins = {
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>
};

export type PhenomicInputConfig = {
  path?: string,
  outdir?: string,
  port?: number,
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>
};

export type PhenomicContentFile = {
  name: string,
  fullpath: string,
  exists: boolean,
  type: string
};

type PhenomicTransformResult = {
  data: Object,
  partial: Object
};

type PhenomicHtmlPropsType = {
  body: React$Element<*>,
  state?: React$Element<*>,
  script: React$Element<*>
};

type PhenomicHtmlType = (props: PhenomicHtmlPropsType) => React$Element<*>;

type PhenomicPluginRenderHTMLType = (
  props?: { body?: string, state?: Object },
  html?: PhenomicHtmlType
) => string;

export type PhenomicPlugin = {
  name: string,
  // transformer
  supportedFileTypes?: Array<string>,
  transform?: ({
    config?: PhenomicConfig,
    file: PhenomicContentFile,
    contents: Buffer
  }) => Promise<PhenomicTransformResult> | PhenomicTransformResult,
  // api
  define?: (api: express$Application, db: PhenomicDB) => mixed,
  // collector
  collect?: (file: mixed) => Array<mixed>,
  // bunder
  buildForPrerendering?: Function,
  getMiddlewares?: (config: PhenomicConfig) => Array<express$Middleware>,
  // renderer
  getRoutes?: Function,
  renderServer?: Function,
  renderHTML?: PhenomicPluginRenderHTMLType
};

export type PhenomicPlugins = Array<PhenomicPlugin>;

export type PhenomicPresets = Array<PhenomicPreset>;

export type PhenomicExtensions = PhenomicPreset;

export type PhenomicConfig = {
  path: string,
  outdir: string,
  port: number,
  plugins: Array<PhenomicPlugin>
};

export type PhenomicQueryConfig = {
  collection?: string,
  id?: string,
  after?: string,
  by?: string,
  value?: string,
  limit?: number
};

export type PhenomicRoute = {
  path: string,
  params?: { [key: string]: any },
  component: {
    getQueries?: (props: { params: { [key: string]: any } }) => {
      [key: string]: PhenomicQueryConfig
    }
  },
  collection?: string | PhenomicQueryConfig
};

// @todo why this inconsistency?
export type PhenomicFetch =
  | IsomorphicFetch
  | ((config: PhenomicQueryConfig) => Promise<any>);
export type phenomic$Query = string;
export type phenomic$Queries = Array<phenomic$Query>;
