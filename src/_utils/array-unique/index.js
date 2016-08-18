// @ flow
// flow is not enabled because of the issue with set and spread
// https://github.com/facebook/flow/issues/1059

export default (array) => [ ...(new Set(array)) ]
