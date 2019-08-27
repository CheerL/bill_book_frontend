export const groupby = (list, key) => {
  return list.reduce((obj, item) => {
    if (!obj[item[key]]) {
      obj[item[key]] = []
      obj[item[key]].push(item)
    } else {
      obj[item[key]].push(item)
    }
    return obj
  }, {})
}

export const obj_groupby = (obj, key, filter = () => true) => {
  const result = {}
  for (let obj_key in obj) {
    let item = obj[obj_key]
    if (!filter(item)) {
      continue
    }
    if (!result[item[key]]) {
      result[item[key]] = []
      result[item[key]].push(item)
    } else {
      result[item[key]].push(item)
    }
  }
  return result
}

export const object_filter = (obj, filter = () => false) => {
  const result = {}
  for (let key in obj) {
    if (filter(obj[key])) {
      result[key] = obj[key]
    }
  }
  return result
}

export const object_map = (obj, map = (value, key, index) => null) => {
  return Object.keys(obj).map((key, index) => {
    const value = obj[key]
    return map(value, key, index)
  })
}

export const object_find = (obj, find = (value, key) => false) => {
  for (let key in obj) {
    if (find(obj[key], key)) {
      return obj[key]
    }
  }
  return undefined
}

export const obj2list = (obj) => {
  const result = []
  for (let key in obj) {
    result.push(obj[key])
  }
  return result
}

export const list2obj = (list, initFunc = init => init) => {
  return list.reduce((obj, item) => {
    if (!obj[item._id]) {
      obj[item._id] = initFunc(item)
    } else {
      obj[item._id].update(item)
    }
    return obj
  }, {})
}

export const update = (store, newStore, keys) => {
  if (newStore._updated) {
    newStore._updated = Date.parse(newStore._updated)
    if (!store._updated || newStore._updated > store._updated) {
      keys.forEach(key => {
        store[key] = newStore[key] === undefined ? store[key] : newStore[key]
      })
    }
  }
}

