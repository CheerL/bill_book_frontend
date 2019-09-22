import baseApiGenerater from './base'

const Api = baseApiGenerater('/billbook_user_relation')

const relationApi = {
  ...Api,
  get: (id, search, other = {}) => {
    other['embedded'] = '{"user":1}'
    return Api.get(id, search, other)
  }
}

export default relationApi