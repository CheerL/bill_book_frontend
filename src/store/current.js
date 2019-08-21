const Current = {
  page: undefined,
  account: undefined,
  bill: undefined,
  billbook: undefined,

  get isDefaultBillbook() {
    if (this.billbook !== undefined && this.billbook.default) {
      return true
    }
    return false
  }
}

export default Current