const Current = {
  page: undefined,
  account: undefined,
  bill: undefined,
  billbook: undefined,
  isRender: false,

  get isDefaultBillbook() {
    if (this.billbook !== undefined && this.billbook.default) {
      return true
    }
    return false
  },
  get isDefaultAccount() {
    if (this.account !== undefined && this.account.default) {
      return true
    }
    return false
  }
}

export default Current