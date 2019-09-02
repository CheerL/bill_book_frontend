import Axios from './axios'

export const prefixUrlGenerater = prefix => (url = '') => `${prefix}${url}`

const baseApiGenerater = prefix => {
    const prefixUrl = prefixUrlGenerater(prefix)
    const get = (id, search) => {
        if (search) {
            return Axios.get(prefixUrl(`?where=${JSON.stringify(search)}`))
        } else if (id !== undefined) {
            return Axios.get(prefixUrl(`/${id}`))
        }
        return Axios.get(prefixUrl())
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