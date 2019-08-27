import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useBillbookAction = () => {
  const { billbook_store, current } = Context.useStore()
  const router = useRouter()

  const getAll = () => {
    api.billbook.get()
      .then(res => {
        const billbooks = res._items
        billbook_store.update(billbooks)
      })
      .catch(console.log)
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
        form.id = res._id
        billbook_store.addBillbook(form)
        router.history.push(`/billbook/detail/${form.id}`)
      })
      .catch(console.log)
  }
  const change = form => {
    const id = current.billbook.id
    form.remark = form.remark ? form.remark : ''
    form.status = form.status[0]
    api.billbook.change(form, id)
      .then(res => {
        console.log(res)
        form._updated = res._updated
        billbook_store.getBillbook(id).update(form)
        router.history.push(`/billbook/detail/${id}`)
      })
      .catch(console.log)
  }
  return {
    getAll,
    add,
    change
  }
}

export default useBillbookAction