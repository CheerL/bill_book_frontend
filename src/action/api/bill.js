import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/bills'

const prefixed_url = url => `${url_prefix}${url}`

export default {
    get: id => {
        if (id !== undefined) {
            return Axios.get(prefixed_url(`/${id}`))
        }
        return Axios.get(prefixed_url(''))
    }
}