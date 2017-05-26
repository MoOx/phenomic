import webpack from "webpack";
import color from "chalk";

export default function(webpackConfig: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      }

      if (stats.hasErrors()) {
        stats.compilation.errors.forEach(item =>
          console.log(color.red(item.stack || item))
        );
        reject("webpack build failed with errors");
      }

      if (stats.hasWarnings()) {
        stats.compilation.warnings.forEach(item =>
          console.log(color.yellow("Warning: %s", item.message))
        );
      }

      resolve(stats);
    });
  });
}
