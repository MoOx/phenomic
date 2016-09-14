type chalkFunction = (log: string) => string

declare module "chalk" {
  declare var exports: {
    reset: chalkFunction,
    bold: chalkFunction,
    dim: chalkFunction,
    italic: chalkFunction,
    underline: chalkFunction,
    inverse: chalkFunction,
    hidden: chalkFunction,
    strikethrough: chalkFunction,

    black: chalkFunction,
    red: chalkFunction,
    green: chalkFunction,
    yellow: chalkFunction,
    blue: chalkFunction,
    magenta: chalkFunction,
    cyan: chalkFunction,
    white: chalkFunction,
    gray: chalkFunction,

    bgBlack: chalkFunction,
    bgRed: chalkFunction,
    bgGreen: chalkFunction,
    bgYellow: chalkFunction,
    bgBlue: chalkFunction,
    bgMagenta: chalkFunction,
    bgCyan: chalkFunction,
    bgWhite: chalkFunction,
  }
}
