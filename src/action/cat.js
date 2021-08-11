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

  const getCats = billbook => {
    // current.loaded.cat = false
    api.cat.get(undefined, billbook ? { billbook: billbook } : undefined)
      .then(afterGetCats)
      .catch(console.log)
      .finally(() => current.loaded.cat = true)
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
  const change = form => {
    const id = form.id
    const cat = cat_store.getCat(undefined, undefined, id)
    delete form.id
    api.cat.change(form, id)
      .then(() => {
        cat.icon = form.icon
        router.history.goBack()
      })
      .catch(console.log)
  }

  const remove = (id, cat) => {
    if (!cat) {
      cat = cat_store.getCat(undefined, undefined, id)
    }
    if (cat) {
      api.cat.remove(cat.id)
        .then(() => cat_store.removeCat(undefined, undefined, cat))
        .catch(console.log)
    }
  }

  return {
    getCats,
    add,
    change,
    remove
  }
}

export default useCatAction