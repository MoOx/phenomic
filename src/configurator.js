import minimist from "minimist"

const argv = minimist(process.argv)

export default function config(pkg = {}) {
  const production = process.argv.includes("--production")

  if (production) {
    if (!pkg.statinamic) {
      throw new Error(
        "Your package.json needs a 'statinamic' configuration section"
      )
    }
    if (!pkg.statinamic.hostname) {
      throw new Error(
        "Your package.json/statinamic section require a 'hostname'"
      )
    }
  }

  // default
  const statinamicConfig = {
    // hostname: null,
    dev: {
      hostname: "0.0.0.0",
      port: argv["dev-server-port"] || 3000,
    },
    ...pkg.statinamic || {},
  }

  const config = {
    __DEV__: process.argv.includes("--dev"),
    __DEVTOOLS__: process.argv.includes("--dev-tools"),
    __DEVSERVER__: process.argv.includes("--dev-server"),
    __PROD__: production,
    __SERVER_PROTOCOL__: statinamicConfig.protocol || "http://",
    ...(
      production
      ? {
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
        },
        __SERVER_HOSTNAME__: statinamicConfig.hostname,
        __SERVER_HOST__: statinamicConfig.hostname,
      }
      : {
        __SERVER_HOSTNAME__: statinamicConfig.dev.hostname,
        __SERVER_PORT__: statinamicConfig.dev.port,
        __SERVER_HOST__:
          statinamicConfig.dev.hostname +
          ":" +
          statinamicConfig.dev.port,
      }
    ),
  }

  config.__SERVER_URL__ = config.__SERVER_PROTOCOL__ + config.__SERVER_HOST__

  return config
}
