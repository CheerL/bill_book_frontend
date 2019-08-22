import Context from '../../store'

export const useSetCurrentBillbook = (params = {}, getDefault = false) => {
  const { billbook_store, current } = Context.useStore()
  const id = params.id
  const redirectDefaultBillbook = () => {
    current.billbook = billbook_store.defaultBillbook
  }

  if (id !== undefined) {
    current.billbook = billbook_store.getBillbook(id)
    if (current.billbook === undefined) {
      redirectDefaultBillbook()
    }
  } else if (getDefault) {
    redirectDefaultBillbook()
  }
}