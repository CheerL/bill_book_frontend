import user from './user'
import bill from './bill'
import billbook from './billbook'
import account from './account'
import cat from './cat'
import relation from './relation'
import Axios from './axios'

const continueGet = (func, res, callback, args) => {
  if (res._items.length === res._meta.max_results) {
      const next = res._links.next.href
      Axios.get(`/${next}`)
        .then(func)
        .catch(console.log)
  } else if (callback) {
    callback(args ? args : null)
  }
}

export default {
    user,
    bill,
    billbook,
    account,
    cat,
    relation,
    continueGet
}