import api from './api'
import Context from '../store'
import { useRouter } from '../router'
import date from '../common/date'
import Money from '../common/money'

const useTransferAction = () => {
  const { bill_store, user, current, account_store } = Context.useStore()
  const router = useRouter()

  const getTransferbook = () => {
    // current.loaded.billbook = false
    api.billbook.get(undefined, { name: '***transfer***' })
      .then(res => {
        const billbook = res._items[0]
        user.transfer = billbook._id
      })
      .catch(console.log)
      .finally(() => current.loaded.billbook = true)
  }

  const add = form => {
    const account = current.account
    form.account = account.id
    form.time = date.date2num(form.time)
    form.amount = Money(form.amount).toNumber()
    form.remark = form.remark ? form.remark : ''
    form.billbook = user.transfer

    if (form.direction) {
      form.consumer = account_store.getTransAccount(account.id)
      form.payer = account_store.getTransAccount(form.target[0])
    } else {
      form.payer = account_store.getTransAccount(account.id)
      form.consumer = account_store.getTransAccount(form.target[0])
      form.amount = -form.amount
    }

    const target = account_store.getAccount(form.target)
    delete form.target
    delete form.direction

    api.bill.add(form)
      .then(res => {
        form._id = res._id
        form._updated = res._updated
        form.billbook = 'transfer'
        form.creater_name = user.nickname
        bill_store.addBill(form)
        current.account.amount = current.account.amount.add(form.amount)
        if (target) {
          target.amount = target.amount.add(-form.amount)
        }
        router.history.goBack()
      })
      .catch(console.log)
  }
  const change = form => {
    const transfer = current.bill
    console.log(form, transfer, account_store.getTransAccount(transfer.account))
    if (account_store.getTransAccount(transfer.account) === (form.payer !== undefined ? form.payer : transfer.payer)) {
      form.amount = -form.amount
    }
    form.remark = form.remark ? form.remark : ''
    form.time = date.date2num(form.time)
    form.amount = Money(form.amount).toNumber()
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
      .then(() => {
        bill_store.removeBill(transfer)
        router.history.goBack()
      })
      .catch(console.log)
  }
  return {
    getTransferbook,
    add,
    change,
    remove
  }
}

export default useTransferAction