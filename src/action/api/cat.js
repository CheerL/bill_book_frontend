import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/bill_categorys'

const prefixed_url = (url = '') => `${url_prefix}${url}`

export default {
    get: id => {
        if (id === undefined) {
            return Axios.get(prefixed_url())
        }
        return Axios.get(prefixed_url(`/${id}`))
    },

    add: form => Axios.post(prefixed_url(), form),

    change: (form, id) => Axios.patch(prefixed_url(`/${id}`), form),

    remove: id => Axios.delete(prefixed_url(`/${id}`))
}