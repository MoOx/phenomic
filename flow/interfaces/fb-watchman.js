export type Watch = {}

export type CommandResponse = {
  watch: Watch,
  relative_path: string,
}

export type Subscription = {
  expression: Array<string | [ string, string ]>,
  fields: Array<string>,
  relative_root: string,
}

export type WatchEvent = {
  files: Array<Object>,
}

declare module "fb-watchman" {
  declare class Client {
    capabilityCheck(config: Object, callback: (error: any) => void): void;
    command(config: ["watch-project", string], callback: (error: any, response: CommandResponse) => void): void;
    command(config: ["subscribe", Watch, "files", Subscription], callback: (error: any) => void): void;
    on(eventName: string, callback: (event: WatchEvent) => void): void;
    end(): void;
  }
}
