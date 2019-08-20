const initBills = [
  {
    id: '000',
    bill_book: '000',
    time: null,
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
    bill_book: '000',
    time: null,
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
    bill_book: '000',
    time: null,
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
    bill_book: '001',
    time: null,
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
    bill_book: 'transfer',
    time: null,
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
    bill_book: 'transfer',
    time: null,
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
    bill_book: 'transfer',
    time: null,
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
  if (bill.bill_book === 'transfer') {
    bill.account = ''
    bill.cat_0 = ''
    bill.cat_1 = ''
    bill.cat_2 = ''
  }

  const store = {
    id: bill.id,
    bill_book: bill.bill_book,
    time: bill.time,
    amount: bill.amount,
    remark: bill.remark,
    account: bill.account,
    consumer: bill.consumer,
    payer: bill.payer,
    creater: bill.creater,
    cat_0: bill.cat_0,
    cat_1: bill.cat_1,
    cat_2: bill.cat_2,

    get isTransfer() {
      return this.bill_book === 'transfer'
    },
    get isOut() {
      if (this.isTransfer && this.now_account !== undefined) {
        return this.payer === this.now_account.id
      }
      return undefined
    },
    get transfer_text() {
      if (this.isOut !== undefined) {
        return this.isOut ? '转出' : '转入'
      }
      return undefined
    },
    get transfer_remark() {
      if (this.isOut !== undefined && this.target !== undefined) {
        return `${this.isOut ? '向' : '从'}${this.target.name}`
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
        const targetId = this.isOut ? this.consumer: this.payer
        if (targetId) {
          this.target = account_store.getAccount(targetId)
        } else {
          this.target = { name: '外部' }
        }
      }
    }
  }
  return store
}

const BillListStoreCreater = initValue => {
  const store = {
    bills: initValue.map(bill => BillStoreCreater(bill)),

    getBill(id) {
      return this.bills.find(bill => bill.id === id)
    },
    addBill(bill) {
      const billStore = BillStoreCreater(bill)
      this.bills.push(billStore)
    },
    removeBill(billStore) {
      this.bills.remove(billStore)
    },

    filterByAccount(account) {
      return this.bills.filter(bill => (
        bill.account === account ||
        bill.payer === account ||
        bill.consumer === account
      ))
    },
    filterByBillBook(bill_book) {
      return this.bills.filter(bill => bill.bill_book === bill_book)
    }
  }
  return store
}

export default BillListStoreCreater(initBills)