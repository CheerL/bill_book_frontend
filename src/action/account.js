import api from './api'
import Context from '../store'
import Decimal from 'decimal.js'
import { useRouter } from '../router'
import Money from '../common/money'

window.Decimal = Decimal

const useAccountAction = () => {
  const { account_store, current } = Context.useStore()
  const router = useRouter()

  const afterGetAccounts = res => {
    const accounts = res._items
    account_store.update(accounts)
    api.continueGet(afterGetAccounts, res)
  }

  const getAccounts = id => {
    // current.loaded.account = false
    api.account.get(id)
      .then(res => {
        if (id) {
          const account = account_store.getAccount(id)
          if (account) {
            account.update(res)
          } else {
            account_store.addAccount(res)
          }
          // api.bill.get(undefined, {})
        } else {
          afterGetAccounts(res)
        }
      })
      .catch(console.log)
      .finally(() => current.loaded.account = true)
  }

  const add = form => {
    form.remark = form.remark ? form.remark : ''
    form.amount = Money(form.amount).toNumber()
    form.default = (
      account_store.defaultAccount === undefined ?
        true : false
    )
    api.account.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        account_store.addAccount(form)
        router.history.push(`/account`)
      })
      .catch(console.log)
  }
  const change = form => {
    const account = current.account
    const id = account.id
    form.remark = form.remark ? form.remark : ''
    form.default = account.default ? true : form.default
    api.account.change(form, id)
      .then(res => {
        form._updated = res._updated
        if (!account.default && form.default) {
          updateDefault()
        }
        account.update(form)
        router.history.goBack()
      })
      .catch(console.log)
  }
  const changeDefault = id => {
    const account = account_store.getAccount(id)
    const form = { 'default': true }
    if (!account.default) {
      api.account.change(form, id)
        .then(res => {
          updateDefault()
          form._updated = res._updated
          account.update(form)
        })
        .catch(console.log)
    }
  }
  const updateDefault = () => {
    const account = account_store.defaultAccount
    if (account !== undefined) {
      api.account.get(account.id)
        .then(res => {
          res._id = account.id
          account.update(res)
        })
        .catch(console.log)
    }
  }
  const remove = id => {
    const account = account_store.getAccount(id)
    if (!account.default) {
      api.account.remove(id)
        .then(() => {
          account_store.removeAccount(account)
          router.history.goBack()
        })
        .catch(console.log)
    }
  }
  return {
    getAccounts,
    add,
    change,
    changeDefault,
    remove
  }
}

export default useAccountAction