import api from './api'
// import Context from '../store'
// import { useRouter } from '../router'

const useBillAction = () => {
  // const { user } = Context.useStore()
  // const router = useRouter()
  const getAll = () => {
    api.bill.get()
      .then(res => {
        const bills = res._items
        console.log(bills)
      })
      .catch(console.log)
  }
  return {
    getAll
  }
}

export default useBillAction