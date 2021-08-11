const isString = str => Object.prototype.toString.call(str) === "[object String]" ? true : false

const longStringCut = (str, num) => {
    if (str && isString(str)) {
        return str.length > num ? (str.slice(0, num) + '...') : str
    } else {
        return ''
    }
}

export {isString, longStringCut}