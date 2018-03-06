export type PhenomicDBEntryInput = {|
  data: Object,
  partial: Object
|};
export type PhenomicDBEntry = {
  data: Object,
  partial: Object,
  id: string
};

export type PhenomicDBEntryPartial = {
  id: string
};
export type PhenomicDBEntryDetailed = {
  id: string,
  body?: any
};

export type PhenomicDBSubRegistry = Array<PhenomicDBEntry>;
export type PhenomicDBRegistry = { [key: string]: PhenomicDBSubRegistry };

export type PhenomicDB = {
  destroy: () => Promise<void>,
  put: (
    sub: null | string | Array<string>,
    id: string,
    value?: PhenomicDBEntryInput
  ) => Promise<void>,
  update: (
    sub: null | string | Array<string>,
    id: string,
    value?: PhenomicDBEntryInput
  ) => Promise<void>,
  get: (
    sub: null | string | Array<string>,
    id: string
  ) => Promise<PhenomicDBEntry>,
  getPartial: (sub: string | Array<string>, id: string) => Promise<mixed>,
  getList: (
    sub: null | string | Array<string>,
    config?: LevelStreamConfig,
    filter?: string,
    filterValue?: string
  ) => Promise<Array<PhenomicDBEntryPartial>>
};

export type PhenomicInputPlugins = {
  plugins?: Array<(arg: PhenomicInputConfig) => PhenomicPlugin>,
  presets?: Array<(arg: PhenomicInputConfig) => PhenomicInputPlugins>
};

export type PhenomicInputConfig = {
  path?: string,
  content?: string,
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

type PhenomicTransformResult = {|
  data: Object,
  partial: Object
|};

type ReactCompo = Function;

export type PhenomicAppType = {
  routes: React$Element<any>
};

type PhenomicIntermediateHtmlPropsType = {
  WrappedApp: ReactCompo,
  renderAsObject: (
    app: React$Element<any>
  ) => {
    main: string,
    state?: Object | null,
    assets: PhenomicAssets
  }
};

export type PhenomicHtmlPropsType = {
  App: ReactCompo,
  render: (
    app: React$Element<any>
  ) => {
    assets: PhenomicAssets,
    html: string,
    Main: ReactCompo,
    State: ReactCompo,
    Style: ReactCompo,
    Script: ReactCompo
  }
};

export type PhenomicHtmlType = (
  props: PhenomicHtmlPropsType
) => React$Element<any>;

export type PhenomicPluginRenderStaticType = ({
  config: PhenomicConfig,
  app: AppType,
  assets: PhenomicAssets,
  phenomicFetch: PhenomicFetch,
  location: string
}) => Promise<Array<{ path: string, contents: string }>>;

export type PhenomicPluginRenderDevServerType = ({
  config: PhenomicConfig,
  assets: PhenomicAssets,
  location: string
}) => string;

export type PhenomicPluginRenderHTMLType = ({
  config: PhenomicConfig,
  props: PhenomicIntermediateHtmlPropsType
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
  renderStatic?: PhenomicPluginRenderStaticType,
  renderDevServer?: PhenomicPluginRenderDevServerType,
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
  content: string,
  outdir: string,
  port: number,
  bundleName: string,
  plugins: Array<PhenomicPlugin>
};

export type PhenomicQueryConfig = {
  path?: string,
  id?: string,
  after?: string,
  by?: string,
  value?: string,
  order?: string,
  limit?: number
};

export type PhenomicRoute = {
  path: string,
  params?: { [key: string]: any },
  component: {
    getQueries?: (props: { params: { [key: string]: any } }) => {
      [key: string]: PhenomicQueryConfig
    }
  }
};

export type PhenomicAssets = { [key: string]: string };

// @todo why this inconsistency?
export type PhenomicFetch =
  | IsomorphicFetch
  | ((config: PhenomicQueryConfig) => Promise<any>);
export type phenomic$Query = string;
export type phenomic$Queries = Array<phenomic$Query>;
