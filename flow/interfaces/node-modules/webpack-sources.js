/* eslint-disable no-unused-vars */
type SourceType = Object

type RawSourceType = (s: string) => SourceType

declare module "webpack-sources" {
  declare var RawSource: RawSourceType
}
