import { observable, action } from 'mobx'
import storeContextCreater from '../../store'

const initAccounts = [
    { name: "现金", amount: 0, id: "00000000", remark: '现金'},
    { name: "支付宝", amount: 1, id: "00000001" },
    { name: "微信", amount: 2, id: "00000002" }
  ]

const init = accounts => {
  return accounts
}

const accountStoreCreater = initValue => {
  const store = observable({
    accounts: init(initValue),
    get total_amount() {
      return store.accounts.reduce((amount, account) => amount + account.amount, 0)
    }
  })
  return store
}

export default storeContextCreater(accountStoreCreater, initAccounts)
