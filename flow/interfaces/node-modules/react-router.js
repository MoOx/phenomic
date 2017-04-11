export type ReactRouterProps = {
  history: Object,
  location: Object,
  params: Object,
  route: Object,
  routeParams: Object,
  routes: Array<Object>,
}

declare module "react-router" {
  declare interface ReactRouter {
    IndexRoute: Class<React$Component<*,*,*>>;
    Link: Class<React$Component<*,*,*>>;
    Redirect: Class<React$Component<*,*,*>>;
    IndexRedirect: Class<React$Component<*,*,*>>;
    Route: Class<React$Component<*,*,*>>;
    Router: Class<React$Component<*,*,*>>;
    browserHistory: any;
    useRouterHistory:
      (historyFactory: Function) => (options: ?Object) => Object;
    match: Function;
    RouterContext: Class<React$Component<*,*,*>>;
    createRoutes: (routes: React$Element<*>) => Array<Object>;
    formatPattern: (pattern: string, params: Object) => string;
    applyRouterMiddleware: Function;
  }
  declare var exports: ReactRouter;
}

declare module "react-router/lib/PatternUtils" {
  declare var exports: any;
}

declare module "react-router/lib/RouteUtils" {
  declare var exports: any;
}
