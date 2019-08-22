const initAccounts = [
  { name: "现金", id: "000", remark: '现金', default: true },
  { name: "支付宝", amount: 1, id: "001", default: false },
  { name: "微信", amount: 2, id: "002", default: false }
]

const accountStoreCreater = (account) => {
  const store = {
    id: account.id,
    name: account.name,
    amount: account.amount ? Number(account.amount): 0,
    remark: account.remark ? account.remark: '',
    default: account.default !== undefined ? account.default : false
  }
  return store
}

const accountListStoreCreater = initValue => {
  const store = {
    accounts: initValue.map(account => accountStoreCreater(account)),

    get total_amount() {
      return this.accounts.reduce((amount, account) => amount + Number(account.amount), 0)
    },
    get defaultAccount() {
      return this.accounts.find(account => account.default)
    },

    getAccount(id) {
      if (id === '') {
        return {
          id: '',
          name: '外部'
        }
      }
      return this.accounts.find(account => account.id === id)
    },
    addAccount(account) {
      const accountStore = accountStoreCreater(account)
      this.accounts.push(accountStore)
    },
    removeAccount(accountStore) {
      this.accounts.remove(accountStore)
    }
  }
  return store
}

export default accountListStoreCreater(initAccounts)
