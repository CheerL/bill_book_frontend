import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useBillbookAction = () => {
  const { billbook_store, current } = Context.useStore()
  const router = useRouter()

  const afterGetBillbooks = res => {
    const billbooks = res._items
    billbook_store.update(billbooks)
    api.continueGet(afterGetBillbooks, res)
  }

  const getBillbooks = () => {
    // current.loaded.billbook = false
    api.billbook.get()
      .then(afterGetBillbooks)
      .catch(console.log)
      .finally(() => current.loaded.billbook = true)
  }

  const add = form => {
    form.remark = form.remark ? form.remark : ''
    form.status = form.status[0]
    form.default = (
      billbook_store.defaultBillbook === undefined ?
        true : false
    )

    api.billbook.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        billbook_store.addBillbook(form)
        router.push(`/billbook/detail/${form._id}`)
      })
      .catch(console.log)
  }
  const change = form => {
    const billbook = current.billbook
    const id = billbook.id
    form.remark = form.remark ? form.remark : ''
    form.status = form.status[0]
    form.default = billbook.default ? true : form.default
    api.billbook.change(form, id)
      .then(res => {
        form._updated = res._updated
        if (!billbook.default && form.default) {
          updateDefault()
        }
        billbook.update(form)
        router.push(`/billbook/detail/${id}`)
      })
      .catch(console.log)
  }
  const changeDefault = id => {
    const billbook = billbook_store.getBillbook(id)
    const form = { 'default': true }
    if (!billbook.default) {
      api.billbook.change(form, id)
        .then(res => {
          updateDefault()
          form._updated = res._updated
          billbook.update(form)
        })
        .catch(console.log)
    }
  }
  const updateDefault = () => {
    const billbook = billbook_store.defaultBillbook
    if (billbook !== undefined) {
      api.billbook.get(billbook.id)
        .then(res => {
          res._id = billbook.id
          billbook.update(res)
        })
        .catch(console.log)
    }
  }
  const remove = id => {
    const billbook = billbook_store.getBillbook(id)
    if (!billbook.default) {
      api.billbook.remove(id)
        .then(() => {
          billbook_store.removeBillbook(billbook)
          router.push(`/billbook/detail/${billbook_store.defaultBillbook.id}`)
        })
        .catch(console.log)
    }
  }
  return {
    getBillbooks,
    add,
    change,
    changeDefault,
    remove
  }
}

export default useBillbookAction