// @flow
import type {
  paragraphsWithClosestHeading,
  paragraphWithClosestHeading,
} from "./find-closest-heading"
import type { headingsList, heading } from "./headings-list"

type headingCompact = {
  h1?: string,
  h2?: string,
  h3?: string,
  h4?: string,
  h5?: string,
  h6?: string,
  content: string,
}

export type hierarchy = Array<headingCompact>

function convertToCompactHeadingStyle(heading: heading): headingCompact {
  return {
    ["h" + heading.heading]: heading.content,
  }
}

export default function makeHierarchy(
  headingsList: headingsList,
  paragraphs: paragraphsWithClosestHeading
): hierarchy {
  return paragraphs = paragraphs.map((p: paragraphWithClosestHeading) => {
    if (typeof p.closestHeading === "undefined") {
      return p
    }

    const closestHeading = headingsList.find((heading) => {
      return (
        // $FlowFixMe undefined is defined above
        heading.content === p.closestHeading.content &&
        // $FlowFixMe undefined is defined above
        heading.heading === p.closestHeading.heading
      )
    })

    let parents = {}
    closestHeading.parents.forEach((heading) => (
      parents = {
        ...parents,
        ...convertToCompactHeadingStyle(heading),
      }
    ))

    return {
      ...convertToCompactHeadingStyle(closestHeading),
      ...parents,
      content: p.content,
    }
  })
}
