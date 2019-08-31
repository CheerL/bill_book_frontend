import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/billbooks'

const prefixed_url = (url = '')=> `${url_prefix}${url}`

export default {
    get: (id, search) => {
        if (search) {
            return Axios.get(prefixed_url(`?where=${JSON.stringify(search)}`))
        } else if (id !== undefined) {
            return Axios.get(prefixed_url(`/${id}`))
        }
        return Axios.get(prefixed_url())
    },

    add: form => Axios.post(prefixed_url(), form),

    change: (form, id) => Axios.patch(prefixed_url(`/${id}`), form),

    remove: id => Axios.delete(prefixed_url(`/${id}`))
}