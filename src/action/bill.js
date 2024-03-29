import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import date from '../common/date'
import Money from '../common/money'

const useBillAction = () => {
  const { bill_store, user, current } = Context.useStore()
  const router = useRouter()

  const afterGetBills = res => {
    if (!current.loading.bill) {
      current.loading.bill = true
    }
    bill_store.update(res._items)
    api.continueGet(afterGetBills, res, () => {
      current.loading.bill = false
    })
  }

  const getBills = () => {
    if (!current.loading.bill) {
      current.loading.bill = true
    }
    api.bill.get()
      .then(afterGetBills)
      .catch(console.log)
      .finally(() => current.loaded.bill = true)
  }

  const add = form => {
    form.time = date.date2num(form.time)
    form.amount = Money(form.amount).toNumber()
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
        form.create_name = user.nickname
        bill_store.addBill(form)
        router.history.push(`/billbook/detail/${form.billbook}`)
      })
      .catch(console.log)
  }

  const change = form => {
    const bill = current.bill
    form.time = date.date2num(form.time)
    form.amount = Money(form.amount).toNumber()
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
    removePure(id, () => router.history.goBack())
  }
  const removePure = (id, callback) => {
    const bill = bill_store.getBill(id)
    api.bill.remove(id)
      .then(() => {
        if (bill.nowAccount !== undefined) {
          const account = bill.nowAccount
          api.account.get(account.id)
            .then(res => account.update(res))
            .catch(console.log)
        }
        bill_store.removeBill(bill)
        if(callback && typeof(callback) === 'function') {
          callback()
        }
      })
      .catch(console.log)
  }
  return {
    getBills,
    add,
    change,
    remove,
    removePure
  }
}

export default useBillAction