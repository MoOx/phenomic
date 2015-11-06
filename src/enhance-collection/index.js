export default function enhanceCollection(collection, options) {
  options = {
    ...options,
  }

  if (options.filter) {
    collection = filter(collection, [ options.filter ])
  }

  if (options.filters) {
    collection = filter(collection, options.filters)
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

export function filter(collection, filters) {
  return collection.reduce((acc, item) => {
    filters.forEach((filter) => {
      switch (typeof filter) {
      case "function":
        if (filter(item)) {
          acc.push(item)
        }
        break

      case "object":
        const keys = Object.keys(filter)
        if (
          keys.reduce(
            (acc, key) => acc && item[key] === filter[key],
            true
          )
        ) {
          acc.push(item)
        }
        break

      case "string":
      default:
        if (item[filter]) {
          acc.push(item)
        }
        break

      }
    })

    return acc
  }, [])
}

export function sort(collection, sort = "date") {
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

export function reverse(collection) {
  collection = [ ...collection ]
  collection.reverse()
  return collection
}

export function limit(collection, limit) {
  return collection.slice(0, limit)
}

export function addSiblingReferences(collection) {
  const last = collection.length - 1
  return collection.map((item, i) => {
    return {
      ...item,
      ...(0 != i) && { previous: collection[i-1] },
      ...(last != i) && { next: collection[i+1] },
    }
  })
}
