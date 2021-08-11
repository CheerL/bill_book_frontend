import baseApiGenerater from './base'

const url_prefix = '/accounts'

const accountApi = {
  ...baseApiGenerater(url_prefix)
}

export default accountApi