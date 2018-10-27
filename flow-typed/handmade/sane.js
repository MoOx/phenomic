declare module "sane" {
  declare type SaneCallbackType = (
    filepath: string,
    root: string,
    stat: Object,
  ) => void | Promise<void>;
  declare type SaneOptionsType = {
    watchman: boolean,
    glob: $ReadOnlyArray<string>,
  };
  declare type Watcher = {
    on: (string, SaneCallbackType) => void,
    close: () => void,
  };
  declare module.exports: (path: string, options: SaneOptionsType) => Watcher;
}
