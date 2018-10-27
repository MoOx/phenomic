// @flow

declare type Url = {
  href: string,
  protocol: string,
  slashes?: boolean,
  host: string,
  auth?: string,
  hostname: string,
  port?: string,
  pathname: string,
  search?: string,
  path?: string,
  query?: Object,
  hash?: string,
};

declare type PhenomicDBConfig = {|
  sortFunctions?: {
    [key: string]: (PhenomicDBEntry, PhenomicDBEntry) => number,
  },
|};

declare type PhenomicDBEntryInput = {|
  data: Object,
  partial: Object,
|};
declare type PhenomicDBEntry = {|
  data: Object,
  partial: Object,
  id: string,
|};

declare type PhenomicDBEntryPartial = {
  id: string,
};
declare type PhenomicDBEntryDetailed = {|
  id: string,
  value: {
    body?: any,
  },
|};

declare type PhenomicDBSubRegistry = Array<PhenomicDBEntry>;
declare type PhenomicDBRegistry = { [key: string]: PhenomicDBSubRegistry };

declare type PhenomicDB = {|
  _getDatabase: () => PhenomicDBRegistry,
  _setDatabase: PhenomicDBRegistry => void,
  destroy: () => void,
  put: (
    sub: null | string | $ReadOnlyArray<string>,
    id: string,
    value?: PhenomicDBEntryInput,
  ) => void,
  update: (
    sub: null | string | $ReadOnlyArray<string>,
    id: string,
    value?: PhenomicDBEntryInput,
  ) => void,
  get: (
    sub: null | string | $ReadOnlyArray<string>,
    id: string,
  ) => PhenomicDBEntryDetailed,
  getPartial: (
    sub: string | $ReadOnlyArray<string>,
    id: string,
  ) => mixed | PhenomicDBEntryPartial,
  getList: (
    sub: null | string | $ReadOnlyArray<string>,
    query?: {
      gt?: string,
      gte?: string,
      lt?: string,
      lte?: string,
      limit?: number,
      sort?: string,
      reverse?: boolean,
    },
    filter?: string,
    filterValue?: string,
  ) => $ReadOnlyArray<PhenomicDBEntryPartial>,
|};

declare type PhenomicInputPluginOption = { [optionName: string]: mixed };

declare type PhenomicInputPlugin =
  | string
  // | {| default: PhenomicPluginModule<PhenomicInputPluginOption> |}
  | PhenomicPluginModule<PhenomicInputPluginOption>;

declare type PhenomicInputPluginWithOptionalOptions =
  | PhenomicInputPlugin
  | $ReadOnlyArray<PhenomicInputPlugin | PhenomicInputPluginOption>;

declare type PhenomicInputPreset = (any) => PhenomicInputPlugins;
declare type PhenomicInputMaybePreset = string | PhenomicInputMaybePreset;

declare type PhenomicInputPlugins = {|
  plugins?:
    | $ReadOnlyArray<PhenomicInputPluginWithOptionalOptions>
    | {
        [name: string]: PhenomicInputPluginWithOptionalOptions,
      },
  presets?: $ReadOnlyArray<
    | PhenomicInputMaybePreset
    | $ReadOnlyArray<
        | PhenomicInputMaybePreset
        | $ReadOnlyArray<$ReadOnlyArray<string | PhenomicInputPluginOption>>
        | {
            [name: string]: PhenomicInputPluginOption,
          },
      >,
  >,
|};

type globs = $ReadOnlyArray<string>;

declare type PhenomicInputConfig = {|
  baseUrl?: string,
  path?: string,
  content?: { [key: string]: globs | {| root: string, globs: globs |} },
  outdir?: string,
  port?: number,
  socketPort?: number,
  bundleName?: string,
  db?: PhenomicDBConfig,
  ...PhenomicInputPlugins,
|};

declare type PhenomicContentFile = {|
  name: string,
  fullpath: string,
  // exists: boolean,
  // type: string
|};

type PhenomicTransformResult = {|
  data: Object,
  partial: Object,
|};

type ReactCompo = Function;

declare type PhenomicAppType = {|
  routes: React$Node,
|};

declare type PhenomicHtmlPropsType = {|
  App: ReactCompo,
  render: (
    app: React$Node,
  ) => {|
    assets: PhenomicAssets,
    html: string,
    Main: ReactCompo,
    State: ReactCompo,
    Style: ReactCompo,
    Script: ReactCompo,
  |},
|};

declare type PhenomicHtmlType = (props: PhenomicHtmlPropsType) => React$Node;

declare type PhenomicPluginModule<Opt> = (
  config: PhenomicConfig,
  options: Opt,
) => PhenomicPlugin;

declare type PhenomicPlugin = {|
  name: string,
  // transformer
  supportedFileTypes?: $ReadOnlyArray<string>,
  transform?: ({|
    file: PhenomicContentFile,
    contents: Buffer,
  |}) => PhenomicTransformResult | Promise<PhenomicTransformResult>,
  // api
  extendAPI?: ({|
    apiServer: express$Application,
    db: PhenomicDB,
  |}) => mixed,
  // collector
  collect?: ({|
    db: PhenomicDB,
    transformers: PhenomicPlugins,
  |}) => void | Promise<void>,
  // bunder
  buildForPrerendering?: () => Promise<PhenomicAppType>,
  build?: () => PhenomicAssets,
  // renderer
  getRoutes?: PhenomicAppType => any,
  // urls-resolver
  resolveURLs?: ({|
    routes: any,
  |}) => Promise<$ReadOnlyArray<string>>,
  renderStatic?: ({|
    app: PhenomicAppType,
    assets: PhenomicAssets,
    location: string,
  |}) => Promise<$ReadOnlyArray<{| path: string, contents: string |}>>,
  renderDevServer?: ({|
    assets: PhenomicAssets,
    location: string,
  |}) => string,
  // common
  addDevServerMiddlewares?: () =>
    | $ReadOnlyArray<express$Middleware>
    | Promise<$ReadOnlyArray<express$Middleware>>,
  beforeBuild?: () => void | Promise<void>,
  afterBuild?: () => void | Promise<void>,
|};

declare type PhenomicPlugins = $ReadOnlyArray<PhenomicPlugin>;

declare type PhenomicConfig = {|
  baseUrl: Url,
  path: string,
  content: { [key: string]: globs | {| root: string, globs: globs |} },
  outdir: string,
  port: number,
  socketPort: number,
  bundleName: string,
  db: PhenomicDBConfig,
  plugins: $ReadOnlyArray<PhenomicPlugin>,
|};

declare type PhenomicQueryConfig = {|
  path?: string,
  id?: string,
  after?: string,
  by?: string,
  value?: string,
  order?: string,
  sort?: string,
  limit?: number,
|};

declare type PhenomicRoute = {|
  path: string,
  params?: { [key: string]: any },
  component: {
    getInitialProps?: ({ params: { [key: string]: any } }) => Object,
    getAllPossibleUrls?: ({ path: string }) => $ReadOnlyArray<string>,
    getQueries?: ({ params: { [key: string]: any } }) => {
      [key: string]: PhenomicQueryConfig,
    },
  },
|};

declare type PhenomicAssets = { [key: string]: string };

declare type phenomic$Query = string;
declare type phenomic$Queries = $ReadOnlyArray<phenomic$Query>;
