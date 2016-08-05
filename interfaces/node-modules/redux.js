declare module "redux" {
  declare function createStore(
    reducer: Function,
    initialState: any
  ): Function

  declare class Redux {
    bindActionCreators(actionCreators: Object, dispatch: Function): Object;
    combineReducers(reducers: Object): Object;
    applyMiddleware(...args: any): Function;
    compose(...args: any): Function;
    createStore: createStore;
  }
  declare var exports: Redux;
}
