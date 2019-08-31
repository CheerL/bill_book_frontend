import Axios from './axios'
// import Qs from 'qs'

const url_prefix = '/users'

const prefixed_url = (url = '') => `${url_prefix}${url}`

export default {
    login: (username, password, remember = true) => Axios.post(prefixed_url('/login'), {
        username: username,
        password: password,
        remember: remember
    }),

    login_jwt: () => Axios.post(prefixed_url('/jwt')),

    delete: () => Axios.post(prefixed_url('/remove')),

    register: (username, password, nickname, remember = true) => Axios.post(prefixed_url('/register'), {
        username: username,
        password: password,
        remember: remember,
        nickname: nickname
    }),
    forget: (username, password) => Axios.post(prefixed_url('/forget'), {
        username: username,
        password: password
    }),

    change: (form, id) => Axios.patch(`/user_infos/${id}`, form)
}