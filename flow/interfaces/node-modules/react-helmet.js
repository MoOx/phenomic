declare module "react-helmet" {
  declare function rewind(): void;

  declare interface ReactHelmet {
    rewind: rewind
  }

  declare var exports: ReactHelmet
}
