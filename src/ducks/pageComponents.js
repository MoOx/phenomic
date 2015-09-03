export default function reducer(state = {}, action) {
  switch (action.type) {
  case "PAGE_COMPONENTS_SET":
    return {
      ...action.pageComponents,
    }

  default:
    return state
  }
}
