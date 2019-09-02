import baseApiGenerater, { prefixUrlGenerater } from './base'
import Axios from './axios'

const url_prefix = '/billbook_user_relation'
const prefixUrl = prefixUrlGenerater(url_prefix)

const relationApi = {
  ...baseApiGenerater(url_prefix),
  get : (id, search) => {
        if (search) {
            return Axios.get(prefixUrl(`?where=${JSON.stringify(search)}&embedded={"user":1}`))
        } else if (id !== undefined) {
            return Axios.get(prefixUrl(`/${id}/?embedded={"user":1}`))
        }
        return Axios.get(prefixUrl('?embedded={"user":1}'))
    }
}

export default relationApi