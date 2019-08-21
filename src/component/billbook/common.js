import Context from '../../store'

export const setCurrentBillbook = (params = {}, getDefault = false) => {
  const { billbook_store, current } = Context.useStore()
  const id = params.id
  if (id !== undefined) {
    current.billbook = billbook_store.getBillbook(id)
  } else if (getDefault) {
    current.billbook = billbook_store.defaultBillbook
  }
}