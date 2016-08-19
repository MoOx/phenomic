declare module "offline-plugin" {
  declare type offlinePluginOptions = {
    caches?: "all" | {
      main?: Array<string>,
      additional?: Array<string>,
      optional?: Array<string>,
    },
    publicPath?: string,
    updateStrategy?: "changed" | "all",
    externals?: Array<string>,
    excludes?: Array<string>,
    relativePaths?: boolean,
    version?: string | (plugin?: OfflinePlugin) => void,
    rewrites?: Function | Object,
    ServiceWorker?: null | false | {
      output?: string,
      entry?: string,
      scope?: string,
      navigateFallbackURL?: string,
      events?: boolean,
    },
    AppCache?: null | false | {
      NETWORK?: string,
      directory?: string,
      events?: boolean,
      FALLBACK?: Object,
    },
  }

  declare function OfflinePlugin(options?: offlinePluginOptions): void
  declare var exports: OfflinePlugin
}

declare module "offline-plugin/runtime" {
  declare type offlinePluginRuntimeInstallOptions = {
    onInstalled?: Function,
    onUpdating?: Function,
    onUpdateReady?: Function,
    onUpdateFailed?: Function,
    onUpdated?: Function,
  }

  declare interface offlinePluginRuntime {
    applyUpdate: () => void,
    install: (options?: offlinePluginRuntimeInstallOptions) => void,
  }

  declare var exports: offlinePluginRuntime
}
