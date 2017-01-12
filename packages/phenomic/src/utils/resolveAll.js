/**
 * @flow
 */
const resolveAll = (objectOfPromises: { [key: string]: any } ): { [key: string]: any } => {
  const finalObject = {}
  return Promise.all(Object.keys(objectOfPromises).map(key =>
    Promise.resolve(objectOfPromises[key])
      .then(value => finalObject[key] = value)
  ))
    .then(() => finalObject)
}

module.exports = resolveAll
