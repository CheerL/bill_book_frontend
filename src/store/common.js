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