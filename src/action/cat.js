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
        cats.forEach(cat => {
          cat.text = cat.name
          cat_store.addCat(cat)
        });
      })
      .catch(console.log)
  }

  const add = form => {
    const billbook = current.billbook
    form.billbook = billbook.id
    form.labels = []
    api.cat.add(form)
      .then(res => {
        form.text = form.name
        cat_store.addCat(form)
        router.history.goBack()
      })
      .catch(console.log)
  }

  return {
    getCats,
    add
  }
}

export default useCatAction