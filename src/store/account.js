import { list2obj, update, object_find } from '../common/object'

const initAccounts = [
  // { name: "现金", _id: "000", remark: '现金', default: false, _updated: 15000000 },
  // { name: "支付宝", amount: 1, _id: "001", default: false, _updated: 15000000 },
  // { name: "微信", amount: 2, _id: "002", default: false, _updated: 15000000 }
]

const accountStoreCreater = (account) => {
  const store = {
    id: account._id,
    name: account.name,
    amount: account.amount ? Number(account.amount) : 0,
    remark: account.remark ? account.remark : '',
    default: account.default !== undefined ? account.default : false,
    _updated: Date.parse(account._updated),

    update(account) {
      const keys = ['name', 'amount', 'remark', 'default', '_updated']
      update(this, account, keys)
    }
  }
  return store
}

const accountListStoreCreater = initValue => {
  const store = {
    accounts: list2obj(initValue, accountStoreCreater),

    get accountNum() {
      return Object.keys(this.accounts).length
    },
    get total_amount() {
      return Object.keys(this.accounts).reduce(
        (amount, id) => amount + Number(this.accounts[id].amount), 0
      )
    },
    get defaultAccount() {
      return object_find(this.accounts, account => account.default)
    },

    getAccount(id) {
      if (id === '') {
        return {
          id: '',
          name: '外部'
        }
      }
      return object_find(this.accounts, account => account.id === id)
    },
    addAccount(account) {
      const localAccount = this.getAccount(account._id)
      if (!localAccount) {
        this.accounts[account._id] = accountStoreCreater(account)
      } else {
        localAccount.update(account)
      }
    },
    removeAccount(accountStore) {
      delete this.accounts[accountStore.id]
    },
    update(accounts) {
      accounts.forEach(account => {
        const localAccount = this.getAccount(account._id)
        if (localAccount) {
          localAccount.update(account)
        } else {
          this.addAccount(account)
        }
      })
    }
  }
  return store
}

export default accountListStoreCreater(initAccounts)
