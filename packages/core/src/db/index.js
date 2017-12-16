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
  if (filter && filterValue && filter !== "default") {
    db = db.filter(item => {
      if (Array.isArray(item.data[filter])) {
        return item.data[filter].indexOf(filterValue) > -1;
      }
      return item.data[filter] === filterValue;
    });
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
      [subname]: [value, ...db].sort((a, b) => (b.id > a.id ? -1 : 1))
    }
  };
}

async function getDataRelation(fieldName, ids) {
  let partial = null;
  try {
    if (Array.isArray(ids)) {
      partial = await Promise.all(ids.map(id => db.getPartial(fieldName, id)));
    } else {
      partial = await db.getPartial(fieldName, ids);
    }
    return partial;
  } catch (error) {
    return ids;
  }
}

async function getDataRelations(fields) {
  const ids = Object.keys(fields);
  const resolvedValues = await Promise.all(
    ids.map(id => getDataRelation(id, fields[id]))
  );
  return ids.reduce((resolvedFields, id, index) => {
    resolvedFields[id] = resolvedValues[index];
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
    id: string,
    value: any
  ): Promise<any> {
    return new Promise(resolve => {
      const data = { ...value, id };
      return resolve(addToSublevel(sub, data));
    });
  },
  get(sub: null | string | Array<string>, id: string): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      const item = getSublevel(sub).find(item => item.id === id);
      if (!item) {
        return reject(new NotFoundError("Key not found in database"));
      }
      const { body, ...metadata } = item.data;
      const relatedData = await getDataRelations(metadata);
      resolve({
        id: id,
        value: {
          ...relatedData,
          ...(body ? { body } : {})
        }
      });
    });
  },
  getPartial(sub: string | Array<string>, id: string): Promise<mixed> {
    return new Promise(resolve => {
      const item = getSublevel(sub).find(item => item.id === id);

      if (!item) {
        return resolve(id);
      }
      const type = typeof item.partial;
      if (type === "string" || type === "number" || type === "boolean") {
        resolve(item.partial);
      } else {
        resolve({ id, ...item.partial });
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
        const index = collection.findIndex(item => item.id === config.gte);
        collection = index > -1 ? collection.slice(index) : collection;
      } else if (config.gt) {
        const index = collection.findIndex(item => item.id === config.gt);
        collection = index > -1 ? collection.slice(index + 1) : collection;
      } else if (config.lte) {
        const index = collection.findIndex(item => item.id === config.lte);
        collection = index > -1 ? collection.slice(0, index + 1) : collection;
      } else if (config.lt) {
        const index = collection.findIndex(item => item.id === config.lt);
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
                id: item.id,
                value
              };
            }
            return {
              ...value,
              id: item.id
            };
          })
        )
      ).then(resolve);
    });
  }
};

export default db;
