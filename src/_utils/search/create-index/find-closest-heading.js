// @flow
type paragraphWithClosestHeading = {
  content: string,
  closestHeading: {
    heading: number,
    content: string,
  },
}
export type paragraphsWithClosestHeading = Array<paragraphWithClosestHeading>

/*
 * Find closest heading to all paragraph
 */
export default function($: any): paragraphsWithClosestHeading {
  const result = []

  $("p").each(function() {
    let next = true
    let currentTag = $(this)

    while (next) {
      currentTag = currentTag.prev()

      if (typeof currentTag.get(0) === "undefined") {
        result.push({
          content: $(this).html(),
        })
        next = false
      }
      else {
        const currentTagName = currentTag.get(0).tagName

        if (/^h\d$/.test(currentTagName)) {
          result.push({
            content: $(this).html(),
            closestHeading: {
              heading: parseInt(currentTagName.slice(1)),
              content: currentTag.text(),
            },
          })
          next = false
        }
      }
    }
  })

  return result
}
