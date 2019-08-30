import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import date from '../common/date'

const useBillAction = () => {
  const { bill_store, user, current } = Context.useStore()
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
    form.creater = user.id
    form.billbook = form.billbook[0]
    form.account = form.account[0]
    if (!form.direction) {
      form.amount = -form.amount
    }

    delete form.direction

    api.bill.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        bill_store.addBill(form)
        router.history.push(`/billbook/detail/${form.billbook}`)
      })
      .catch(console.log)
  }

  const change = form => {
    const bill = current.bill
    form.time = date.date2num(form.time)
    form.amount = form.amount ? Number(form.amount) : 0
    form.remark = form.remark ? form.remark : ''
    form.cat_1 = form.cat_1 ? form.cat_1 : ''
    form.billbook = form.billbook[0]
    form.account = form.account[0]

    if (!form.direction) {
      form.amount = -form.amount
    }

    delete form.direction

    api.bill.change(form, bill.id)
      .then(res => {
        form._updated = res._updated
        bill.update(form)
        router.history.goBack()
      })
      .catch(console.log)
  }
  const remove = id => {
    const bill = bill_store.getBill(id)
    api.bill.remove(id)
    .then(() => {
      bill_store.removeBill(bill)
      router.history.goBack()
    })
    .catch(console.log)
  }
  return {
    getBills,
    add,
    change,
    remove
  }
}

export default useBillAction