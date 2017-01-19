export type Level = {
  put(key: string, value: any, options: Object, callback: (error: any) => any): void,
  get(key: string, options: Object, callback: (error: any, data: any) => any): void,
  del(key: string, options: Object, callback: (error: any) => any): void,
  createReadStream(): stream$Readable,
  open(callback: (error: any) => any): void,
  close(callback: (error: any) => any): void,
}

export type SublevelPartial = {
  sublevel(key: string): Sublevel,
};

export type Sublevel = Level & SublevelPartial;

export type LevelStreamConfig = {
  gt?: string,
  lt?: string,
  limit?: number,
}

declare module "levelup" {
  declare function exports(location: string): Level;
}

declare module "leveldown" {
  declare var exports: {
    destroy(location: string, callback: (error: any) => any): void;
  };
}

declare module "level-sublevel" {
  declare function exports(db: Level): Sublevel;
}
