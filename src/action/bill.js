import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import date from '../common/date'

const useBillAction = () => {
  const { bill_store, user } = Context.useStore()
  const router = useRouter()
  const getBills = () => {
    api.bill.get()
      .then(res => {
        const bills = res._items
        bill_store.update(bills)
      })
      .catch(console.log)
  }
  const add = form => {
    form.time = date.date2num(form.time)
    form.amount = form.amount ? Number(form.amount) : 0
    form.creater = user.username
    form.billbook = form.billbook[0]
    form.account = form.account[0]

    api.bill.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        bill_store.addBill(form)
        router.history.push(`/billbook/detail/${form.billbook}`)
      })
      .catch(console.log)
  }
  return {
    getBills,
    add
  }
}

export default useBillAction