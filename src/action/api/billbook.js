import baseApiGenerater from './base'

const url_prefix = '/billbooks'

const billbookApi = {
  ...baseApiGenerater(url_prefix)
}

export default billbookApi