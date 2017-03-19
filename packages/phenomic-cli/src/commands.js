import yargs from "yargs"
// @todo remove that and use project config
import phenomic from "phenomic"

yargs.command(
  "start",
  "start your project (server / development mode)",
  {},
  () => phenomic.start()
)

yargs.command(
  "build",
  "build your project (static / production mode)",
  {},
  () => phenomic.build()
)

export default () => {
  yargs.parse(process.argv)
}
