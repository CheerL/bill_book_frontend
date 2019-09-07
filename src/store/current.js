const Current = {
  page: undefined,
  account: undefined,
  bill: undefined,
  billbook: undefined,
  loaded: {
    account: false,
    bill: false,
    billbook: false,
    cat: false,
    relation: false,
  },

  get isRender() {
    for (let key in this.loaded) {
      if (!this.loaded[key]) {
        return false
      }
    }
    return true
  },

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
  },

  loadAll(status) {
    for (let key in this.loaded) {
      this.loaded[key] = status
    }
  }
}

export default Current