// deprecated
import { loader } from "../phenomic-loader"

console.log(
  "⚠️ 'phenomic/lib/content-loader' reference is deprecated. " +
  "Please use `import { loader } from \"phenomic\"` " +
  "and use `loader` variable as the reference in webpack configuration."
)

export default loader
