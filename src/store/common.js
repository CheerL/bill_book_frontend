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

export const obj2list = (obj) => {
  const result = []
  for (let key in obj) {
    result.push(obj[key])
  }
  return result
}

export const list2obj = (list, initFunc = init => init) => {
  return list.reduce((obj, item) => {
    if (!obj[item.id]) {
      obj[item.id] = initFunc(item)
    } else {
      obj[item.id].update(item)
    }
    return obj
  }, {})
}

