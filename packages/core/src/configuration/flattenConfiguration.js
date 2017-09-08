const debug = require("debug")("phenomic:core:configuration");

const normalizePlugin = (plugin: PhenomicPlugin) => {
  if (!plugin) {
    throw new Error("phenomic: You provided an undefined plugin");
  }

  debug("plugin typeof", typeof plugin);

  if (typeof plugin !== "function") {
    throw new Error(
      "phenomic: You provided an plugin with type is " +
        typeof plugin +
        ". But function is expected instead of " +
        String(plugin)
    );
  }

  // @todo send config here ?
  const pluginInstance = plugin();

  debug("plugin", pluginInstance.name);

  if (Array.isArray(pluginInstance)) {
    throw new Error(
      "Array of plugins should be specified in 'presets' section of your configuration"
    );
  }

  return pluginInstance;
};

const normalizeModule = (module: any) => {
  if (typeof module === "string") {
    // $FlowFixMe yeah yeah, I know what I am doing flow
    module = require(require.resolve(module));
  }

  // for es6 transpiled code
  if (module && typeof module.default === "function") {
    module = module.default;
  }

  debug("normalizeModule", module);

  return module;
};

function flattenPresets(config?: PhenomicInputPlugins = {}): PhenomicPlugins {
  debug("flattenPresets", config);
  const plugins = [
    ...(config.presets || [])
      .map(normalizeModule)
      .reduce((acc, preset) => [...acc, ...flattenPresets(preset())], []),
    ...(config.plugins || []).map(normalizeModule).map(normalizePlugin)
  ];
  debug("flattenPresets plugins", plugins);
  return plugins;
}

function flattenConfiguration(
  config: PhenomicInputConfig = {}
): PhenomicConfig {
  // @todo ad validation here?
  debug("flattenConfiguration", config);
  return {
    path: config.path || "",
    outdir: config.outdir || "",
    port: config.port || 8080,
    bundleName: config.bundleName || "",
    plugins: flattenPresets(config)
  };
}

export { flattenPresets };
export default flattenConfiguration;
