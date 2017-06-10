type chalkFunctionType = (log: string, ...args?: Array<any>) => string;

declare module "chalk" {
  declare var exports: {
    reset: chalkFunctionType,
    bold: chalkFunctionType,
    dim: chalkFunctionType,
    italic: chalkFunctionType,
    underline: chalkFunctionType,
    inverse: chalkFunctionType,
    hidden: chalkFunctionType,
    strikethrough: chalkFunctionType,

    black: chalkFunctionType,
    red: chalkFunctionType,
    green: chalkFunctionType,
    yellow: chalkFunctionType,
    blue: chalkFunctionType,
    magenta: chalkFunctionType,
    cyan: chalkFunctionType,
    white: chalkFunctionType,
    gray: chalkFunctionType,

    bgBlack: chalkFunctionType,
    bgRed: chalkFunctionType,
    bgGreen: chalkFunctionType,
    bgYellow: chalkFunctionType,
    bgBlue: chalkFunctionType,
    bgMagenta: chalkFunctionType,
    bgCyan: chalkFunctionType,
    bgWhite: chalkFunctionType
  };
}
