declare module "react-hot-loader" {
  declare interface ReactHotLoader {
    AppContainer: Class<React$Component<*, *, *>>,
  }
  declare var exports: ReactHotLoader
}
