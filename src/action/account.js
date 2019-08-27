import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useAccountAction = () => {
  const { account_store, current } = Context.useStore()
  const router = useRouter()

  const getAccounts = () => {
    api.account.get()
      .then(res => {
        const accounts = res._items
        account_store.update(accounts)
      })
      .catch(console.log)
  }
  const add = form => {
    form.remark = form.remark ? form.remark : ''
    form.amount = form.amount ? Number(form.amount) : 0
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
    const form = {'default': true}
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