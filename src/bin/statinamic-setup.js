import npmInstallPackage from "npm-install-package"

import { peerDependencies as peerDeps } from "../../package.json"

console.log("Installing required dependencies...")
const depsMap = Object.keys(peerDeps)
  .reduce(
    (deps, dep) => {
      deps.push(`${ dep }@${ peerDeps[dep] }`)
      return deps
    },
    []
  )
npmInstallPackage(
  depsMap,
  {
    saveDev: true,
  },
  (err) => {
    if (err) {
      throw err
    }

    console.log("Required dependencies successfully installed.")
  }
)
