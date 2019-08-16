const initAccounts = [
    { name: "现金", id: "00000000", remark: '现金'},
    { name: "支付宝", amount: 1, id: "00000001" },
    { name: "微信", amount: 2, id: "00000002" }
  ]

const accountStoreCreater = ({ id, name, amount= 0, remark = "" }) => {
  const store = {
    id: id,
    name: name,
    amount: amount,
    remark: remark,

    changeName(newName) {
      this.name = newName
    },
    changeAmount(newAmount) {
      this.amount = newAmount
    },
    changeRemark(newRemark) {
      this.remark = newRemark
    }
  }
  return store
}

const accountListStoreCreater = initValue => {
  const store = {
    accounts: initValue.map(account => accountStoreCreater(account)),

    get total_amount() {
      return this.accounts.reduce((amount, account) => amount + Number(account.amount), 0)
    },

    getAccount(id) {
      const account = this.accounts.find(account => account.id === id)
      if (!account) {
        throw new Error(`no account whose id ${id}`)
      }
      return account
    },
    addAccount(account) {
      const newAccount = accountStoreCreater(account)
      this.accounts.push(newAccount)
    },
    removeAccount(accountStore) {
      this.accounts.remove(accountStore)
    }
  }
  return store
}

export default accountListStoreCreater(initAccounts)
