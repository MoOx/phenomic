/* eslint-disable */
declare module "jsx-test-helpers" {
  declare export function concatPath(dirA: string, dirB: string): string;
  declare export function noop(): void;
  declare export function JSX(jsx: React$Element<any>): string;
  declare export function renderJSX(
    jsx: React$Element<any>,
    cb?: any,
    context?: any
  ): string;
  declare export function render(
    jsx: React$Element<any>,
    cb?: any,
    context?: any
  ): Object;
}
