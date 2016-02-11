import debug from "debug"
import npmInstallPackage from "npm-install-package"

import {
  peerDependencies as peerDeps,
  optionalPeerDependencies as opPeerDeps,
} from "../../package.json"

const tobeInstalledDeps = {
  ...peerDeps,
  ...opPeerDeps,
}

const log = debug("statinamic:bin:setup")

log("Installing required dependencies...")

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

    log("Required dependencies successfully installed.")
  }
)
