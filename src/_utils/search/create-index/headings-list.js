// @flow
export type heading = {
  heading: number,
  content: string,
  parents: Array<heading>,
}

export type headingsList = Array<heading>
/*
 * Generate a heading list
 */
export default function($: any) {
  const filter = "h1, h2, h3, h4, h5, h6"

  const flatTree = []
  $(filter).each(function() {
    flatTree.push({
      heading: parseInt($(this).get(0).tagName.slice(1)),
      content: $(this).text(),
    })
  })

  return flatTree.map((node, i) => {
    let currentHeadingLvl = node.heading - 1

    const result = {
      ...node,
      parents: [],
    }

    while (currentHeadingLvl > 0 && i >= 0) {
      const currentNode = flatTree[i]
      if (currentNode.heading === currentHeadingLvl) {
        result.parents.push(currentNode)
        currentHeadingLvl--
      }
      i--
    }

    return result
  })
}
