import api from './api'
import Context from '../store'

const useRelationAction = () => {
  const { relation_store } = Context.useStore()

  const getRelation = (id, billbook) => {
    api.relation.get(
      id,
      billbook ? { billbook: billbook } : undefined
    )
      .then(res => {
        const relation = res._items
        relation.forEach(r => relation_store.addRelation(r))
      })
      .catch(console.log)
  }

  return {
    getRelation
  }
}

export default useRelationAction