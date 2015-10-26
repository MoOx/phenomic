import npmInstallPackage from "npm-install-package"

import { peerDependencies as peerDeps } from "../../package.json"

console.log("Installing required dependencies...")
npmInstallPackage(
  Object.keys(peerDeps).reduce((deps, dep) => {
    deps.push(`${ dep }@${ peerDeps[dep] }`)
    return deps
  }, []),
  { save: true },
  err => {
    if (err) throw err
  }
)
console.log("Required dependencies successfully installed.")

// TODO copy boilerplate
// TODO add npm scripts

// TODO ask/add some metadata (twitter, github, analytics) ?
// TODO add babel config ?
