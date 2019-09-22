import Axios from './axios'

export const prefixUrlGenerater = prefix => (url = '') => `${prefix}${url}`

const other2str = other => {
    const keys = Object.keys(other)
    if (!keys.length) {
        return ''
    }
    return '?' + keys.map(key => `${key}=${other[key]}`).join('&')
}

const baseApiGenerater = prefix => {
    const prefixUrl = prefixUrlGenerater(prefix)
    const get = (id, search, other = {}) => {
        if (id !== undefined) {
            return Axios.get(prefixUrl(`/${id}`))
        } else if (search) {
            other['where'] = JSON.stringify(search)
        }
        return Axios.get(prefixUrl(other2str(other)))
    }
    const add = form => Axios.post(prefixUrl(), form)
    const change = (form, id) => Axios.patch(prefixUrl(`/${id}`), form)
    const remove = id => Axios.delete(prefixUrl(`/${id}`))

    return {
        get,
        add,
        change,
        remove
    }
}

export default baseApiGenerater