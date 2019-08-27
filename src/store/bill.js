import { date } from '../common'
import { list2obj, obj2list, object_filter } from './common'

const initBills = [
  {
    id: '000',
    billbook: '000',
    time: 1566316800000,
    amount: 5,
    remark: '同事聚餐',
    account: '000',
    consumer: 'me',
    payer: 'me',
    creater: 'me',
    cat_0: '餐饮',
    cat_1: '聚餐',
    cat_2: ''
  },
  {
    id: '001',
    billbook: '000',
    time: 1566316800000,
    amount: 25,
    remark: '',
    account: '000',
    consumer: 'me',
    payer: 'me',
    creater: 'me',
    cat_0: '娱乐',
    cat_1: '电影',
    cat_2: ''
  },
  {
    id: '002',
    billbook: '000',
    time: 1563638400000,
    amount: 100,
    remark: '',
    account: '001',
    consumer: 'she',
    payer: 'me',
    creater: 'me',
    cat_0: '购物',
    cat_1: '衣服',
    cat_2: ''
  },
  {
    id: '003',
    billbook: '001',
    time: 1566316800000,
    amount: 35,
    remark: '旅行',
    account: '000',
    consumer: 'me',
    payer: 'me',
    creater: 'me',
    cat_0: '餐饮',
    cat_1: '午餐',
    cat_2: ''
  },
  {
    id: '004',
    billbook: 'transfer',
    time: 1566316800000,
    amount: 100,
    remark: '',
    account: '',
    consumer: '000',
    payer: '001',
    creater: 'me',
    cat_0: '',
    cat_1: '',
    cat_2: ''
  },
  {
    id: '005',
    billbook: 'transfer',
    time: 1566316800000,
    amount: 20,
    remark: '',
    account: '',
    consumer: '002',
    payer: '000',
    creater: 'me',
    cat_0: '',
    cat_1: '',
    cat_2: ''
  },
  {
    id: '006',
    billbook: 'transfer',
    time: 1566316800000,
    amount: 20,
    remark: '',
    account: '',
    consumer: '',
    payer: '001',
    creater: 'me',
    cat_0: '',
    cat_1: '',
    cat_2: ''
  },
]

const BillStoreCreater = bill => {
  if (bill.billbook === 'transfer') {
    bill.account = ''
    bill.cat_0 = ''
    bill.cat_1 = ''
  }

  const store = {
    id: bill.id,
    billbook: bill.billbook,
    time: bill.time,
    amount: bill.amount,
    remark: bill.remark,
    account: bill.account,
    consumer: bill.consumer,
    payer: bill.payer,
    creater: bill.creater,
    cat_0: bill.cat_0,
    cat_1: bill.cat_1,

    get time_month() {
      return this.time_str.slice(0, 7)
    },

    get time_date() {
      return this.time ? date.num2date(this.time) : null
    },
    get time_str() {
      return this.time ? date.num2str(this.time) : ''
    },

    get isTransfer() {
      return this.billbook === 'transfer'
    },
    get isOut() {
      if (this.isTransfer && this.now_account !== undefined) {
        return this.payer === this.now_account.id
      }
      return undefined
    },

    get transfer_remark() {
      if (this.isOut !== undefined && this.target !== undefined) {
        return this.isOut ? `向${this.target.name}转出` : `从${this.target.name}转入`
      }
      return undefined
    },
    get transfer_amount() {
      if (this.isOut !== undefined) {
        return this.isOut ? -this.amount : this.amount
      }
      return undefined
    },
    setAccount(account) {
      if (this.isTransfer) {
        this.now_account = account
      }
    },
    setTarget(account_store) {
      if (this.isTransfer && this.now_account !== undefined) {
        const targetId = this.isOut ? this.consumer : this.payer
        if (targetId) {
          this.target = account_store.getAccount(targetId)
        } else {
          this.target = { name: '外部' }
        }
      }
    },
    update(bill) {
      this.billbook = bill.billbook
      this.time = bill.time
      this.amount = bill.amount
      this.remark = bill.remark
      this.account = bill.account
      this.consumer = bill.consumer
      this.payer = bill.payer
      this.creater = bill.creater
      this.cat_0 = bill.cat_0
      this.cat_1 = bill.cat_1
    }
  }
  return store
}

const BillListStoreCreater = initValue => {
  const store = {
    bills: list2obj(initValue, BillStoreCreater),

    getBill(id) {
      return this.bills[id]
    },
    addBill(bill) {
      if (!this.bills[bill.id]) {
        this.bills[bill.id] = BillStoreCreater(bill)
      } else {
        this.bills[bill.id].update(bill)
      }
    },
    removeBill(billStore) {
      delete this.bills[billStore.id]
    },

    filterByAccount(account, list = false) {
      const result = object_filter(this.bills, bill => bill.account === account)
      return list ? obj2list(result) : result
    },
    filterByBillbook(billbook, list = false) {
      const result = object_filter(this.bills, bill => bill.billbook === billbook)
      return list ? obj2list(result) : result
    }
  }
  return store
}

export default BillListStoreCreater(initBills)
