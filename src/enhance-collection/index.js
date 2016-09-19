// @flow
import memoize from "lru-memoize"

const defaultConsole = console

export default memoize(100)(enhanceCollection)

function enhanceCollection(
  collection: PhenomicMinifiedCollection,
  options: Object,
  console: Object = defaultConsole
): PhenomicMinifiedCollection {
  options = {
    ...options,
  }

  if (options.filter) {
    collection = filter(collection, [ options.filter ], console)
  }

  if (options.filters) {
    collection = filter(collection, options.filters, console)
  }

  if (options.sort) {
    collection = sort(collection, options.sort)
  }

  if (options.reverse) {
    collection = reverse(collection)
  }

  if (options.limit) {
    collection = limit(collection, options.limit)
  }

  if (options.addSiblingReferences) {
    collection = addSiblingReferences(collection)
  }

  return collection
}

export function filter(
  collection: PhenomicMinifiedCollection,
  filters: any,
  console: Object = defaultConsole
): PhenomicMinifiedCollection {
  return collection.reduce((acc, item) => {
    let include = true
    for (const filter of filters) {
      switch (typeof filter) {
      case "function": {
        const flag = filter(item)
        if (typeof flag !== "boolean") {
          console.warn(
            "Function passed to filter item in 'enhanceCollection' should " +
            "return a boolean value. \n" +
            `You returned '${ typeof flag }'.`,
          )
        }
        if (!flag) {
          include = false
        }
        break
      }
      case "object": {
        const keys = Object.keys(filter)
        if (
          !keys.reduce(
            (acc, key) => acc && (
              (
                typeof filter[key] === "string" &&
                item[key] === filter[key]
              )
              ||
              (
                filter[key] instanceof RegExp &&
                item[key] &&
                item[key].match(filter[key])
              )
            ),
            true
          )
        ) {
          include = false
        }
        break
      }
      case "string":
      default:
        if (!item[filter]) {
          include = false
        }
        break
      }

      // break asap
      if (!include) {
        break
      }
    }

    if (include) {
      acc.push(item)
    }

    return acc
  }, [])
}

export function sort(
  collection: PhenomicMinifiedCollection,
  sort: Function | string = "date"
):PhenomicMinifiedCollection {
  collection = [ ...collection ]

  if (typeof sort === "function") {
    collection.sort(sort)
  }
  else {
    collection.sort((a, b) => {
      a = a[sort]
      b = b[sort]
      if (!a && !b) return 0
      if (!a) return -1
      if (!b) return 1
      if (b > a) return -1
      if (a > b) return 1
      return 0
    })
  }

  return collection
}

export function reverse(
  collection: PhenomicMinifiedCollection
): PhenomicMinifiedCollection {
  collection = [ ...collection ]
  collection.reverse()
  return collection
}

export function limit(
  collection: PhenomicMinifiedCollection,
  limit: number
): PhenomicMinifiedCollection {
  return collection.slice(0, limit)
}

export function addSiblingReferences(
  collection: PhenomicMinifiedCollection
): PhenomicMinifiedCollection {
  const last = collection.length - 1
  // TODO: Use commented code when flow can understand it
  // return collection.map((item, i) => ({
  //   ...item,
  //   ...(0 != i) && { previous: collection[i-1] },
  //   ...(last != i) && { next: collection[i+1] },
  // }))
  return collection.map((item, i) => {
    const newItem = { ...item }
    if (0 != i) {
      newItem.previous = collection[i-1]
    }
    if (last != i) {
      newItem.next = collection[i+1]
    }

    return newItem
  })
}
