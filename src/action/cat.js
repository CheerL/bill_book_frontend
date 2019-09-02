import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useCatAction = () => {
  const { cat_store, current } = Context.useStore()
  const router = useRouter()

  const getCats = () => {
    api.cat.get()
      .then(res => {
        const cats = res._items
        cats.forEach(cat => cat_store.addCat(cat));
      })
      .catch(console.log)
  }

  const getCatByBillbook = billbook => {
    api.cat.get(undefined, {billbook: billbook})
    .then(res => {
      const cats = res._items
      cats.forEach(cat => {
        cat_store.addCat(cat)
      })
    })
  }

  const add = form => {
    const billbook = current.billbook
    form.billbook = billbook.id
    form.labels = []
    api.cat.add(form)
      .then(() => {
        cat_store.addCat(form)
        router.history.goBack()
      })
      .catch(console.log)
  }

  return {
    getCats,
    getCatByBillbook,
    add
  }
}

export default useCatAction