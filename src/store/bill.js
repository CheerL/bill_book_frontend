import { date } from '../common'
import { list2obj, obj2list, object_filter, update } from '../common/object'
import Money from '../common/money'
import { getNormalAccount } from './account'

const initBills = []

const BillStoreCreater = bill => {
  const store = {
    id: bill._id,
    billbook: bill.billbook,
    time: bill.time,
    amount: Money(bill.amount),
    remark: bill.remark,
    account: bill.account,
    consumer: bill.consumer,
    payer: bill.payer,
    creater_name: bill.creater_name,
    cat_0: bill.cat_0,
    cat_1: bill.cat_1,
    _updated: Date.parse(bill._updated),

    get time_month() {
      return this.time_str.slice(0, 7)
    },

    get time_date() {
      return this.time ? date.num2date(this.time) : null
    },
    get time_str() {
      return this.time ? date.num2str(this.time) : ''
    },

    get isOwner() {
      if (this.nowAccount !== undefined) {
        return this.nowAccount.id === this.account
      }
      return undefined
    },

    get isOut() {
      if (this.nowAccount !== undefined) {
        return this.nowAccount.id === getNormalAccount(this.payer)
      }
      return undefined
    },

    get transfer_remark() {
      if (this.remark) {
        return this.remark
      } else if (this.nowAccount !== undefined && this.target !== undefined) {
        return this.isOut ? `向${this.target.name}转出` : `从${this.target.name}转入`
      }
      return undefined
    },
    get transfer_amount() {
      if (this.nowAccount !== undefined) {
        return this.isOwner ? this.amount : Money(-this.amount)
      }
      return undefined
    },
    setAccount(account) {
      this.nowAccount = account
    },
    setTarget(account_store) {
      const targetId = this.isOut ? this.consumer : this.payer
      if (targetId) {
        this.target = account_store.getAccount(getNormalAccount(targetId))
      } else {
        this.target = { name: '外部' }
      }
    },
    update(bill) {
      const keys = [
        'billbook', 'time', 'amount',
        'remark', 'account', 'consumer',
        'payer', 'creater_name', 'cat_0',
        'cat_1', '_updated'
      ]
      update(this, bill, keys)
    }
  }
  return store
}

const BillListStoreCreater = initValue => {
  const store = {
    bills: list2obj(initValue, BillStoreCreater),

    get billNum() {
      return Object.keys(this.bills).length
    },

    getBill(id) {
      return this.bills[id]
    },
    addBill(bill) {
      if (!this.bills[bill._id]) {
        this.bills[bill._id] = BillStoreCreater(bill)
      } else {
        this.bills[bill._id].update(bill)
      }
    },
    removeBill(billStore) {
      delete this.bills[billStore.id]
    },

    filterByAccount(account, list = false) {
      const result = object_filter(this.bills, bill => (
        bill.account === account ||
        bill.consumer === `transfer${account}` ||
        bill.payer === `transfer${account}`
      ))
      return list ? obj2list(result) : result
    },
    filterByBillbook(billbook, list = false) {
      const result = object_filter(this.bills, bill => bill.billbook === billbook)
      return list ? obj2list(result) : result
    },
    update(bills) {
      bills.forEach(bill => {
        const localBill = this.getBill(bill._id)
        if (localBill) {
          localBill.update(bill)
        } else {
          this.addBill(bill)
        }
      });
    }
  }
  return store
}

export default BillListStoreCreater(initBills)
