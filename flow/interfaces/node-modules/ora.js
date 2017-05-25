type oraColors =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray";

type oraOptions =
  | string
  | {
      text: string,
      spinner: string | Object,
      color: oraColors,
      interval: number,
      stream: Object,
      enabled: boolean
    };

type oraInstance = {
  start: () => oraInstance,
  stop: () => oraInstance,
  succeed: () => oraInstance,
  fail: () => oraInstance,
  stopAndPersist: (symbol: string) => oraInstance,
  clear: () => oraInstance,
  render: () => oraInstance,
  frame: () => oraInstance,
  text: string,
  color: string,
  stream: {
    // @todo add more about WritableStream
    write: Function
  }
};
declare module "ora" {
  declare var exports: (options?: oraOptions) => oraInstance;
}
