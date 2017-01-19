// @flow
import { join } from "path"
import fs from "fs"

import definitions from "../definitions.js"

export default function(
  { config, errors }:
  {
    config: PhenomicOldConfig,
    errors: Array<string>,
  }
): void {
  // Prepare config.assets path and route
  if (config.assets) {

    // normalize simple string options
    if (
      [ "boolean", "string", "object" ].indexOf(typeof config.assets) < 0
    ) {
      errors.push(
        `You provided a ${ typeof config.assets } for 'assets' option.` +
        "This option accept a boolean value, a string, or an object."
      )
    }
    else if (
        typeof config.assets === "object" &&
        (
          typeof config.assets.path !== "string" ||
          typeof config.assets.route !== "string"
        )
    ) {
      const configAssets: PhenomicAssetsConfig = config.assets
      errors.push(
        "You provided an object for 'assets' option." +
        "You need to provide 2 keys: " +
        "'path' (string, path of your assets, relative to 'source') " +
        "and 'route' (string, path of your assets folder in the destination)." +
        "\n" +
        "You provided the following keys: " +
        Object.keys(configAssets).map(
          (k) => `'${ k }' (${ typeof configAssets[k] })`
        ).toString()
      )
    }
    else {
      if (typeof config.assets === "string") {
        config.assets = {
          path: config.assets,
          route: config.assets,
        }
      }
      else if (typeof config.assets === "boolean") {
        // === true
        config.assets = {
          path: definitions.assets.default,
          route: definitions.assets.default,
        }
      }

      const configAssets: PhenomicAssetsConfig = config.assets
      // adjust path and validate
      config.assets = {
        path: join(config.cwd, config.source, configAssets.path),
        route: configAssets.route,
      }

      // Test folder
      try {
        const stats = fs.lstatSync(config.assets.path)
        if (!stats.isDirectory()) {
          // Just throw a dump error
          throw new Error("This is not a folder")
        }
      }
      catch (e) {
        errors.push(
          config.assets.path +
          " doesn't exist or isn't a folder. " +
          "Please check your 'assets' configuration. " +
          "Note that if you don't need this option, " +
          "you can set it up to `false`."
        )
      }
    }
  }
}
