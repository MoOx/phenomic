import merge from "deep-assign";

const glue = "$$";
const nullSub = "__null__";
const emptyDatabase: PhenomicDBRegistry = {};
let database: PhenomicDBRegistry = emptyDatabase;

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
  let db = database[sub.join(glue)] || [];
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

function putToSublevel(
  subName: null | string | Array<string>,
  value: PhenomicDBEntry
) {
  if (!Array.isArray(subName)) {
    subName = [subName === null ? nullSub : subName];
  }
  const subname = subName.join(glue);
  const sub = database[subname] || [];
  database = {
    ...database,
    [subname]: [...sub.filter(item => item.id !== value.id), value].sort(
      (a, b) => (b.id > a.id ? -1 : 1)
    )
  };
}

function updateToSublevel(
  subName: null | string | Array<string>,
  value: PhenomicDBEntry
) {
  if (!Array.isArray(subName)) {
    subName = [subName === null ? nullSub : subName];
  }
  const subname = subName.join(glue);
  const sub = database[subname] || [];
  database = {
    ...database,
    [subname]: [
      ...sub.filter(item => item.id !== value.id),
      merge({}, sub.find(item => item.id === value.id) || {}, value)
    ].sort((a, b) => (b.id > a.id ? -1 : 1))
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
  _getDatabase(): PhenomicDBRegistry {
    return database;
  },
  _setDatabase(newDb: PhenomicDBRegistry) {
    database = newDb;
  },
  destroy(): Promise<void> {
    return new Promise(resolve => {
      database = emptyDatabase;
      resolve();
    });
  },
  async put(
    sub: null | string | Array<string>,
    id: string,
    value: PhenomicDBEntryInput = { data: {}, partial: {} }
  ): Promise<void> {
    await putToSublevel(sub, {
      data: value.data,
      partial: value.partial,
      id
    });
  },
  async update(
    sub: null | string | Array<string>,
    id: string,
    value: PhenomicDBEntryInput = { data: {}, partial: {} }
  ): Promise<any> {
    await updateToSublevel(sub, {
      data: value.data,
      partial: value.partial,
      id
    });
  },
  async get(
    sub: null | string | Array<string>,
    id: string
  ): Promise<PhenomicDBEntryDetailed> {
    const item = getSublevel(sub).find(item => item.id === id);
    if (typeof item === "undefined") {
      throw new NotFoundError("ID not found in database");
    }
    const { body, ...metadata } = item.data;
    const relatedData = await getDataRelations(metadata);
    return {
      id: id,
      value: {
        ...relatedData,
        ...(body ? { body } : {})
      }
    };
  },
  async getPartial(sub: string | Array<string>, id: string): Promise<mixed> {
    const item = getSublevel(sub).find(item => item.id === id);
    if (!item) {
      return id;
    }
    const type = typeof item.partial;
    if (type === "string" || type === "number" || type === "boolean") {
      return item.partial;
    }
    return { id, ...item.partial };
  },

  getList(
    sub: string | Array<string>,
    config: LevelStreamConfig = {},
    filter: string = "default",
    filterValue: string = ""
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
