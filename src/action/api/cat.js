import baseApiGenerater from './base'

const url_prefix = '/bill_categorys'

const catApi = {
  ...baseApiGenerater(url_prefix)
}

export default catApi