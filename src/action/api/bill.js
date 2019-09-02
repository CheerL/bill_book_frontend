import baseApiGenerater from './base'

const url_prefix = '/bills'

const billApi = {
  ...baseApiGenerater(url_prefix)
}

export default billApi