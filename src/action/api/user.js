import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/users'

const prefixed_url = url => `${url_prefix}${url}`

export default {
    login: (username, password, remember = true) => Axios.post(prefixed_url('/login'), {
        username: username,
        password: password,
        remember: remember
    })
}