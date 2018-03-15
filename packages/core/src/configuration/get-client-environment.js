// inspired from https://github.com/facebook/create-react-app/blob/779dad55465de81972ec72257c734e4afae17094/packages/react-scripts/config/env.js

// Grab NODE_ENV and PHENOMIC_* environment variables and prepare them to be
// injected into the application.
const PHENOMIC = /^PHENOMIC_/i;

export default function getClientEnvironment(config: PhenomicConfig) {
  process.env.PHENOMIC_APP_BASENAME = config.baseUrl.pathname;
  return Object.keys(process.env)
    .filter(key => PHENOMIC.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV
      }
    );
}
