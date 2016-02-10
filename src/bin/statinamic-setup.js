import npmInstallPackage from "npm-install-package"

import {
  peerDependencies as peerDeps,
  optionalPeerDependencies as opPeerDeps,
} from "../../package.json"

const tobeInstalledDeps = {
  ...peerDeps,
  ...opPeerDeps,
}

console.log("Installing required dependencies...")
const depsMap = Object.keys(tobeInstalledDeps)
  .reduce(
    (deps, dep) => {
      deps.push(`${ dep }@${ tobeInstalledDeps[dep] }`)
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
