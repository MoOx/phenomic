// @flow

import defaultConfig from "../defaultConfig.js";

import normalizeBaseUrl from "./normalize-base-url.js";

const debug = require("debug")("phenomic:core:configuration");

type ModuleWithOption<T> = {|
  module: T,
  options?: PhenomicInputPluginOption,
  name: string
|};

function normalizeModule<T>(module): ModuleWithOption<T> {
  let flatModule = module;
  let options: PhenomicInputPluginOption;
  if (Array.isArray(module)) {
    if (module.length !== 2) {
      throw new Error(
        "When using array to register a phenomic module, please an array with 2 items only" +
          "Given " +
          module.length
      );
    }
    flatModule = module[0];
    if (typeof module[0] !== "string" && typeof module[0] !== "function") {
      throw new Error(
        "module should be a string or a function but received " +
          typeof module[0]
      );
    }
    if (!module[1] || typeof module[1] !== "object") {
      throw new Error(
        "options should be an object but received " + typeof module[1]
      );
    }
    // $FlowFixMe we can't cover everything
    options = module[1];
  }
  const preNormalizedModule: T =
    // $FlowFixMe 🤫
    typeof flatModule === "string"
      ? // $FlowFixMe yeah yeah, I know what I am doing flow
        require(require.resolve(flatModule))
      : flatModule;

  // for es6 transpiled code
  if (
    typeof preNormalizedModule === "object" &&
    preNormalizedModule &&
    typeof preNormalizedModule.default === "function"
  ) {
    const normalizedModule = preNormalizedModule.default;
    // debug("normalizeModule (default)", normalizedModule);
    return {
      module: normalizedModule,
      options,
      name: typeof flatModule === "string" ? flatModule : normalizedModule.name
    };
  }
  if (typeof preNormalizedModule === "function") {
    const normalizedModule = preNormalizedModule;
    // debug("normalizeModule", normalizedModule);
    return {
      module: normalizedModule,
      options,
      name: typeof flatModule === "string" ? flatModule : normalizedModule.name
    };
  }
  throw new Error("unknow module type " + typeof module);
}

function flattenPresets(
  pluginsConfig: PhenomicInputPlugins,
  presetOptions?: PhenomicInputPluginOption
): $ReadOnlyArray<ModuleWithOption<PhenomicInputPluginOption>> {
  debug("flattenPresets", pluginsConfig);
  const presets: $ReadOnlyArray<ModuleWithOption<PhenomicInputPreset>> = (
    pluginsConfig.presets || []
  ).map(normalizeModule);
  const pluginsFromPresets = presets.reduce(
    (acc, preset: ModuleWithOption<PhenomicInputPreset>) => {
      const presetResult = preset.module(preset.options);
      const flattenPreset = flattenPresets(presetResult, preset.options);
      return acc.concat(flattenPreset);
    },
    []
  );
  const pluginsFromPlugins = Array.isArray(pluginsConfig.plugins)
    ? pluginsConfig.plugins.map(normalizeModule)
    : pluginsConfig.plugins
      ? Object.keys(pluginsConfig.plugins).map(k =>
          // $FlowFixMe ?
          normalizeModule(pluginsConfig.plugins[k])
        )
      : [];
  // inject preset options
  if (presetOptions)
    if (Array.isArray(presetOptions))
      presetOptions.forEach(options => {
        const pluginName = options[0];
        const opts = options[1];
        const plugin = pluginsFromPlugins.find(
          plugin => plugin.name === pluginName
        );
        if (!plugin) {
          throw new Error(`${pluginName} not found to pass preset options`);
        }
        if (opts) {
          plugin.options = {
            ...(plugin.options || {}),
            ...opts
          };
        }
      });
    else
      Object.keys(presetOptions).forEach(pluginName => {
        if (!pluginName) {
          debug("No plugin name found");
          return;
        }
        const plugin = pluginsFromPlugins.find(
          plugin => plugin.name === pluginName
        );
        if (!plugin) {
          throw new Error(`${pluginName} not found to pass preset options`);
        }
        if (presetOptions && presetOptions[pluginName]) {
          plugin.options = {
            ...(plugin.options || {}),
            ...presetOptions[pluginName]
          };
        }
      });
  const plugins = [...pluginsFromPresets, ...pluginsFromPlugins];
  debug("flattenPresets plugins", plugins);
  return plugins;
}

function initPlugins(
  plugins: $ReadOnlyArray<PhenomicPluginModule<{}>>,
  partialConfig = {}
) {
  return plugins.map(plugin => {
    const pluginInstance = plugin.module(partialConfig, plugin.options);
    debug("plugin", pluginInstance.name);
    if (Array.isArray(pluginInstance)) {
      throw new Error(
        "Array of plugins should be specified in 'presets' section of your configuration"
      );
    }
    return pluginInstance;
  });
}

function flattenConfiguration(config: PhenomicInputConfig): PhenomicConfig {
  debug("flattenConfiguration", config);
  const partialConfig: PhenomicConfig = {
    baseUrl: config.baseUrl
      ? normalizeBaseUrl(config.baseUrl)
      : defaultConfig.baseUrl,
    path: config.path || defaultConfig.path,
    content: config.content || defaultConfig.content,
    outdir: config.outdir || defaultConfig.outdir,
    port: config.port || defaultConfig.port,
    bundleName: config.bundleName || defaultConfig.bundleName,
    plugins: []
  };
  const partialPlugins = flattenPresets({
    plugins: config.plugins || [],
    presets: config.presets || []
  });

  // instanciate plugins with config
  // $FlowFixMe whatever...
  partialConfig.plugins = initPlugins(partialPlugins, partialConfig);

  return partialConfig;
}

export { flattenPresets };
export default flattenConfiguration;
