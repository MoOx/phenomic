import render from "./render/client";

export default (routes: () => React$Element<any>): PhenomicAppType => {
  if (typeof window !== "undefined") {
    render(routes);
  }
  return {
    routes: routes()
  };
};
