import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import date from '../common/date'

const useTransferAction = () => {
  const { bill_store, user, current } = Context.useStore()
  const router = useRouter()

  const getTransfer = () => {
    api.billbook.get(undefined, { name: '***transfer***' })
      .then(res => {
        const billbook = res._items[0]
        user.transfer = billbook._id
      })
      .catch(console.log)
  }

  const add = form => {
    const account = current.account
    form.account = account.id
    form.time = date.date2num(form.time)
    form.amount = form.amount ? Number(form.amount) : 0
    form.creater = user.id
    form.remark = form.remark ? form.remark : ''
    form.billbook = user.transfer

    if (form.direction === 'in') {
      form.consumer = account.id
      form.payer = form.target[0]
    } else if (form.direction === 'out') {
      form.payer = account.id
      form.amount = -form.amount
      form.consumer = form.target[0]
    }

    delete form.target
    delete form.direction

    api.bill.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        form.billbook = 'transfer'
        bill_store.addBill(form)
        router.history.goBack()
      })
      .catch(console.log)
  }
  const change = form => {
    const transfer = current.bill
        form.remark = form.remark ? form.remark : ''
        form.amount = form.amount ? Number(form.amount) : 0
        form.time = date.date2num(form.time)
        api.bill.change(form, transfer.id)
        .then(res => {
          form._updated = res._updated
          transfer.update(form)
          router.history.goBack()
        })
        .catch(console.log)
  }
  const remove = id => {
    const transfer = bill_store.getBill(id)
    api.bill.remove(id)
    .then(()=> {
      bill_store.removeBill(transfer)
      router.history.goBack()
    })
    .catch(console.log)
  }
  return {
    getTransfer,
    add,
    change,
    remove
  }
}

export default useTransferAction