import baseApiGenerater from './base'

const Api = baseApiGenerater('/bills')

const billApi = {
  ...Api,
  get: (id, search, other = {}) => {
    other['sort'] = '[("time",-1)]'
    return Api.get(id, search, other)
  }
}

export default billApi