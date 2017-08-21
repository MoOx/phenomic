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
  bundleName?: string,
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>
};

export type PhenomicContentFile = {
  name: string,
  fullpath: string
  // exists: boolean,
  // type: string
};

type PhenomicTransformResult = {
  data: Object,
  partial: Object
};

type ReactCompo = Function;

type PhenomicIntermediateHtmlPropsType = {
  WrappedApp: ReactCompo,
  renderAsObject: (
    app: React$Element<*>
  ) => {
    main: string,
    state?: Object | null,
    script?: string
  }
};

export type PhenomicHtmlPropsType = {
  App: ReactCompo,
  render: (
    app: React$Element<*>
  ) => {
    Main: ReactCompo,
    State: ReactCompo,
    Script: ReactCompo,
    Body: ReactCompo
  }
};

export type PhenomicHtmlType = (
  props: PhenomicHtmlPropsType
) => React$Element<*>;

type PhenomicPluginRenderHTMLType = ({
  config: PhenomicConfig,
  props?: PhenomicIntermediateHtmlPropsType
}) => string;

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
  collect?: (db: PhenomicDB, fileName: string, parsed: Object) => Array<mixed>,
  // bunder
  buildForPrerendering?: Function,
  // renderer
  getRoutes?: Function,
  renderServer?: Function,
  renderHTML?: PhenomicPluginRenderHTMLType,
  // common
  addDevServerMiddlewares?: (
    config: PhenomicConfig
  ) => Array<express$Middleware | Promise<express$Middleware>>
};

export type PhenomicPlugins = Array<PhenomicPlugin>;

export type PhenomicPresets = Array<PhenomicPreset>;

export type PhenomicExtensions = PhenomicPreset;

export type PhenomicConfig = {
  path: string,
  outdir: string,
  port: number,
  bundleName: string,
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

export type phenomicAssets = { [key: string]: string };

// @todo why this inconsistency?
export type PhenomicFetch =
  | IsomorphicFetch
  | ((config: PhenomicQueryConfig) => Promise<any>);
export type phenomic$Query = string;
export type phenomic$Queries = Array<phenomic$Query>;
