import Axios from './axios'
import { prefixUrlGenerater } from './base'

const userPrefix = prefixUrlGenerater('/users')
const userinfoPrefix = prefixUrlGenerater('/user_infos')

export default {
    login: (username, password, remember = true) => Axios.post(userPrefix('/login'), {
        username: username,
        password: password,
        remember: remember
    }),

    login_jwt: () => Axios.post(userPrefix('/jwt')),

    delete: () => Axios.post(userPrefix('/remove')),

    register: (username, password, nickname, remember = true) => Axios.post(userPrefix('/register'), {
        username: username,
        password: password,
        remember: remember,
        nickname: nickname
    }),
    forget: (username, password) => Axios.post(userPrefix('/forget'), {
        username: username,
        password: password
    }),

    change: (form, id) => Axios.patch(userinfoPrefix(`/${id}`), form),

    getInfo: (id, search) => {
        if (search) {
            return Axios.get(userinfoPrefix(`?where=${JSON.stringify(search)}`))
        } else if (id) {
            return Axios.get(userinfoPrefix(`/${id}`))
        }
        return Axios.get(userinfoPrefix())
    }
}