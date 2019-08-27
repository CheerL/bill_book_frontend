import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/billbooks'

const prefixed_url = url => `${url_prefix}${url}`

export default {
    get: (id, search) => {
        if (search) {
            return Axios.get(prefixed_url(`?where=${JSON.stringify(search)}`))
        } else if (id !== undefined) {
            return Axios.get(prefixed_url(`/${id}`))
        }
        return Axios.get(prefixed_url(''))
    },
    add: form => {
        return Axios.post(prefixed_url(''), form)
    },
    change: (form, id) => {
        return Axios.patch(prefixed_url(`/${id}`), form)
    },
    remove: id => {
        return Axios.delete(prefixed_url(`/${id}`))
    }
}