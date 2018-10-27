/* eslint-disable */
declare module "jsx-test-helpers" {
  declare module.exports: {
    concatPath: (dirA: string, dirB: string) => string,
    noop: () => void,
    JSX: (jsx: React$Node) => string,
    renderJSX: (jsx: React$Node, cb?: any, context?: any) => string,
    render: (jsx: React$Node, cb?: any, context?: any) => Object,
  };
}
