declare module "sane" {
  declare type SaneCallbackType = (
    filepath: string,
    root: string,
    stat: Object
  ) => void;
  declare type SaneOptionsType = {
    watchman: boolean,
    glob: Array<string>
  };
  declare type Watcher = {
    on: (string, SaneCallbackType) => void,
    close: () => void
  };
  declare function exports(path: string, options: SaneOptionsType): Watcher;
}
