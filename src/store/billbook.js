import { update, list2obj, object_find } from '../common/object'

const initBillbooks = []

const BillbookStoreCreater = billbook => {
  const store = {
    id: billbook._id,
    name: billbook.name,
    remark: billbook.remark ? billbook.remark : '',
    status: billbook.status,
    cover: billbook.cover ? billbook.cover : 'default',
    default: billbook.default,
    _updated: Date.parse(billbook._updated),

    update(billbook) {
      const keys = ['name', 'remark', 'status', 'cover', 'default', '_updated']
      update(this, billbook, keys)
    }
  }
  return store
}

const BillbookListStoreCreater = initValue => {
  const store = {
    billbooks: list2obj(initValue, BillbookStoreCreater),

    get defaultBillbook() {
      return object_find(this.billbooks, billbook => billbook.default)
    },
    update(billbooks) {
      billbooks.forEach(billbook => {
        const localBillbook = this.getBillbook(billbook._id)
        if (localBillbook) {
          localBillbook.update(billbook)
        } else {
          this.addBillbook(billbook)
        }
      })
    },
    addBillbook(billbook) {
      const localBillbook = this.getBillbook(billbook._id)
      if (!localBillbook) {
        this.billbooks[billbook._id] = BillbookStoreCreater(billbook)
      } else {
        localBillbook.update(billbook)
      }
    },
    removeBillbook(billbookStore) {
      delete this.billbooks[billbookStore.id]
    },
    getBillbook(id) {
      return this.billbooks[id]
    }
  }
  return store
}

export default BillbookListStoreCreater(initBillbooks)