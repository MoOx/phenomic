import findCacheDir from "find-cache-dir"
import levelUp from "levelup"
import levelDown from "leveldown"
import subLevel from "level-sublevel"

const cacheDir = findCacheDir({ name: "phenomic/db", create: true })

const database = levelUp(cacheDir)
const level = subLevel(database)
const options = { valueEncoding: "json" }
const wrapStreamConfig = config => Object.assign({}, config, options)

function getSublevel(db: Sublevel, sub: string | Array<string>, filter: ?string, filterValue: ?string) {
  if (!Array.isArray(sub)) {
    sub = [ sub ]
  }
  if (filter) {
    sub = sub.concat(filter)
    if (filter !== "default" && filterValue) {
      sub = sub.concat(filterValue)
    }
  }
  return sub.reduce((db: Sublevel, name) => db.sublevel(name), db)
}

async function getDataRelation(fieldName, keys) {
  let partial = null
  try {
    if (Array.isArray(keys)) {
      partial = await Promise.all(keys.map(key => db.getPartial(fieldName, key)))
    }
    else {
      partial = await db.getPartial(fieldName, keys)
    }
    return partial
  }
  catch (error) {
    return keys
  }
}

async function getDataRelations(fields) {
  const keys = Object.keys(fields)
  const resolvedValues = await Promise.all(keys.map(key => getDataRelation(key, fields[key])))
  return keys.reduce((resolvedFields, key, index) => {
    resolvedFields[key] = resolvedValues[index]
    return resolvedFields
  }, {})
}

const db = {
  destroy() {
    return new Promise((resolve, reject) => {
      database.close(() => {
        levelDown.destroy(cacheDir, (error) => {
          if (error) {
            reject(error)
          }
          else {
            database.open(() => {
              resolve()
            })
          }
        })
      })
    })
  },
  put(sub: string | Array<string>, key: string, value: any) {
    return new Promise((resolve, reject) => {
      const data = { ...value, key }
      return getSublevel(level, sub)
      .put(key, data, options, (error) => {
        if (error) {
          reject(error)
          return
        }
        else {
          resolve(data)
        }
      })
    })
  },
  get(sub: string | Array<string>, key: string) {
    return new Promise((resolve, reject) => {
      return getSublevel(level, sub).get(key, options, async function(error, data) {
        if (error) {
          reject(error)
        }
        else {
          const { body, ...metadata } = data.data
          const relatedData = await getDataRelations(metadata)
          resolve({
            key: key,
            value: {
              ...relatedData,
              body,
            },
          })
        }
      })
    })
  },
  getPartial(sub: string | Array<string>, key: string) {
    return new Promise((resolve, reject) => {
      return getSublevel(level, sub).get(key, options, (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          resolve({ id: key, ...data.partial })
        }
      })
    })
  },
  getList(sub: string | Array<string>, config: LevelStreamConfig, filter: string = "default", filterValue: string) {
    return new Promise((resolve, reject) => {
      const array = []
      getSublevel(level, sub, filter, filterValue).createReadStream(wrapStreamConfig(config))
      .on("data", async function(data) {
        array.push(
          db.getPartial(sub, data.value.id)
            .then(value => ({
              ...value,
              key: data.key,
            }))
        )
      })
      .on("end", async function() {
        const returnValue = await Promise.all(array)
        resolve(returnValue)
      })
      .on("error", (error) => {
        reject(error)
      })
    })
  },
}

export default db
