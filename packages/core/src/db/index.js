const glue = "$$";
const nullSub = "__null__";
const emptyDatabase = {
  subs: {}
};

let database = emptyDatabase;

function sortBy(sort = "date") {
  return (a, b) => {
    a = a.data[sort];
    b = b.data[sort];
    if (!a && !b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    if (b > a) return -1;
    if (a > b) return 1;
    return 0;
  };
}

function getSublevel(
  sub: null | string | Array<string>,
  filter: ?string,
  filterValue: ?string
) {
  if (!Array.isArray(sub)) {
    sub = [sub === null ? nullSub : sub];
  }
  let db = database.subs[sub.join(glue)] || [];
  if (filter) {
    if (filter !== "default" && filterValue) {
      db = db.filter(item => item[filter] === filterValue);
    }
  }
  return db;
}

function addToSublevel(sub: null | string | Array<string>, value: Object) {
  if (!Array.isArray(sub)) {
    sub = [sub === null ? nullSub : sub];
  }
  const subname = sub.join(glue);
  const db = database.subs[subname] || [];
  database = {
    ...database,
    subs: {
      ...database.subs,
      [subname]: [value, ...db].sort((a, b) => (b.key > a.key ? -1 : 1))
    }
  };
}

async function getDataRelation(fieldName, keys) {
  let partial = null;
  try {
    if (Array.isArray(keys)) {
      partial = await Promise.all(
        keys.map(key => db.getPartial(fieldName, key))
      );
    } else {
      partial = await db.getPartial(fieldName, keys);
    }
    return partial;
  } catch (error) {
    return keys;
  }
}

async function getDataRelations(fields) {
  const keys = Object.keys(fields);
  const resolvedValues = await Promise.all(
    keys.map(key => getDataRelation(key, fields[key]))
  );
  return keys.reduce((resolvedFields, key, index) => {
    resolvedFields[key] = resolvedValues[index];
    return resolvedFields;
  }, {});
}

class NotFoundError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "NotFoundError";
  }
}

const db = {
  getDatabase: () => database,
  destroy(): Promise<void> {
    return new Promise(resolve => {
      database = emptyDatabase;
      resolve();
    });
  },
  put(
    sub: null | string | Array<string>,
    key: string,
    value: any
  ): Promise<any> {
    return new Promise(resolve => {
      const data = { ...value, key };
      return resolve(addToSublevel(sub, data));
    });
  },
  get(sub: null | string | Array<string>, key: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      const item = getSublevel(sub).find(item => item.key === key);
      if (!item) {
        return reject(new NotFoundError("Key not found in database"));
      }
      const { body, ...metadata } = item.data;
      const relatedData = await getDataRelations(metadata);
      resolve({
        key: key,
        value: {
          ...relatedData,
          body
        }
      });
    });
  },
  getPartial(sub: string | Array<string>, key: string): Promise<mixed> {
    return new Promise(resolve => {
      const item = getSublevel(sub).find(item => item.key === key);
      if (!item) {
        return resolve(key);
      }
      const type = typeof item.partial;
      if (type === "string" || type === "number" || type === "boolean") {
        resolve(item.partial);
      } else {
        resolve({ id: key, ...item.partial });
      }
    });
  },
  getList(
    sub: string | Array<string>,
    config: LevelStreamConfig,
    filter: string = "default",
    filterValue: string
  ): Promise<Array<any>> {
    return new Promise(resolve => {
      let collection = getSublevel(sub, filter, filterValue);
      collection.sort(sortBy());
      if (config.reverse) {
        collection = collection.concat().reverse();
      }
      if (config.gte) {
        const index = collection.findIndex(item => item.key === config.gte);
        collection = index > -1 ? collection.slice(index) : collection;
      } else if (config.gt) {
        const index = collection.findIndex(item => item.key === config.gt);
        collection = index > -1 ? collection.slice(index + 1) : collection;
      } else if (config.lte) {
        const index = collection.findIndex(item => item.key === config.lte);
        collection = index > -1 ? collection.slice(0, index + 1) : collection;
      } else if (config.lt) {
        const index = collection.findIndex(item => item.key === config.lt);
        collection = index > -1 ? collection.slice(0, index) : collection;
      }
      if (typeof config.limit === "number") {
        collection = collection.slice(
          0,
          Math.min(config.limit, collection.length)
        );
      }
      Promise.all(
        collection.map(item =>
          db.getPartial(sub, item.id).then(value => {
            const type = typeof value;
            if (
              type === "string" ||
              type === "number" ||
              type === "boolean" ||
              Array.isArray(value)
            ) {
              return {
                key: item.key,
                value
              };
            }
            return {
              ...value,
              key: item.key
            };
          })
        )
      ).then(resolve);
    });
  }
};

export default db;
