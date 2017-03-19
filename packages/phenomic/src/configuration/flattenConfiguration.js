import path from "path"

const normalizeModule = (module) => {
  if (typeof module === "string") {
    module = require(path.resolve(path.join("node_modules", module)))
  }

  // for es6 transpiled code
  if (module && typeof module.default === "function") {
    module = module.default
  }

  return module
}

function flattenConfiguration(config: PhenomicInputPreset = {}): Array<(arg: ?any) => PhenomicPlugin> {
  const plugins = [
    ...(config.presets || [])
      .map(normalizeModule)
      .reduce((acc, preset) => {
        acc.push(...flattenConfiguration(preset()))
        return acc
      }, []),
    ...(config.plugins || []).map(normalizeModule),
  ]
  return plugins
}

export default flattenConfiguration
