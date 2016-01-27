/**
 * Get file data from require.context
 * @param  {func} context  [require.context]
 * @param  {string} filename [relative with content folder]
 * @return {object}          [parsed markdown file or json]
 */
const fileFromContext = (context, filename) => {
  const result = context
    .keys()
    .map(context)
    .filter(x => x.__filename === filename)

  return result[0]
}

export default fileFromContext
