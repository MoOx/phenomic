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
  sub: null | string | $ReadOnlyArray<string>,
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
  subName: null | string | $ReadOnlyArray<string>,
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
  subName: null | string | $ReadOnlyArray<string>,
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

function getDataRelation(fieldName, ids) {
  try {
    if (Array.isArray(ids)) {
      return ids.map(id => db.getPartial(fieldName, id));
    }
    return db.getPartial(fieldName, ids);
  } catch (error) {
    return ids;
  }
}

function getDataRelations(fields) {
  const ids = Object.keys(fields);
  const resolvedValues = ids.map(id => getDataRelation(id, fields[id]));
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
  destroy() {
    database = emptyDatabase;
  },
  put(
    sub: null | string | $ReadOnlyArray<string>,
    id: string,
    value: PhenomicDBEntryInput = { data: {}, partial: {} }
  ) {
    putToSublevel(sub, {
      data: value.data,
      partial: value.partial,
      id
    });
  },
  update(
    sub: null | string | $ReadOnlyArray<string>,
    id: string,
    value: PhenomicDBEntryInput = { data: {}, partial: {} }
  ) {
    updateToSublevel(sub, {
      data: value.data,
      partial: value.partial,
      id
    });
  },
  get(
    sub: null | string | $ReadOnlyArray<string>,
    id: string
  ): PhenomicDBEntryDetailed {
    const item = getSublevel(sub).find(item => item.id === id);
    if (typeof item === "undefined") {
      throw new NotFoundError("ID not found in database");
    }
    const { body, ...metadata } = item.data;
    const relatedData = getDataRelations(metadata);
    return {
      id: id,
      value: {
        ...relatedData,
        ...(body ? { body } : {})
      }
    };
  },
  getPartial(
    sub: null | string | $ReadOnlyArray<string>,
    id: string
  ): mixed | PhenomicDBEntryPartial {
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
    sub: null | string | $ReadOnlyArray<string>,
    config: {
      gt?: string,
      gte?: string,
      lt?: string,
      lte?: string,
      limit?: number,
      reverse?: boolean
    } = {},
    filter: string = "default",
    filterValue: string = ""
  ): $ReadOnlyArray<any> {
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

    return collection.map(item => {
      const value = db.getPartial(sub, item.id);
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
    });
  }
};

export default db;
