import { join } from "path"
import { unlinkSync } from "fs"

export default (wd, fileToKeep, assets) => {
  assets
    .filter((file) => file !== fileToKeep)
    .forEach((file) => {
      unlinkSync(join(wd, file))
    })
}
