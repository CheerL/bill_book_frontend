import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useCatAction = () => {
  const { cat_store, current } = Context.useStore()
  const router = useRouter()

  const afterGetCats = res => {
    const cats = res._items
    cats.forEach(cat => cat_store.addCat(cat));
    api.continueGet(afterGetCats, res)
  }

  const getCats = () => {
    // current.loaded.cat = false
    api.cat.get()
      .then(afterGetCats)
      .catch(console.log)
      .finally(() => current.loaded.cat = true)
  }

  const getCatByBillbook = billbook => {
    api.cat.get(undefined, { billbook: billbook })
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