import Context from '../../../store'

export const useSetCurrentBillbook = (params = {}, getDefault = false) => {
  const { billbook_store, current } = Context.useStore()
  const id = params.id

  if (id !== undefined) {
    current.billbook = billbook_store.getBillbook(id)
    if (current.billbook === undefined) {
      current.billbook = billbook_store.defaultBillbook
    }
  } else if (getDefault) {
      current.billbook = billbook_store.defaultBillbook
  }
}