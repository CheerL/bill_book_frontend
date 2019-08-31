import api from './api'
import Context from '../store'
import { useRouter } from '../router'

const useCatAction = () => {
    const {cat_store, current} = Context.useStore()

    const getCats = () => {
        api.cat.get()
        .then(res => {
            const cats = res._items
            cats.forEach(cat => {
                cat_store.
            });
        })
    }
}