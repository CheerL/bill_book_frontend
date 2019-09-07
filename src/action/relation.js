import api from './api'
import Context from '../store'

const useRelationAction = () => {
  const { relation_store, current } = Context.useStore()

  const afterGetRelation = res => {
    const relation = res._items
    relation.forEach(r => relation_store.addRelation(r))
    api.continueGet(afterGetRelation, res)
  }

  const getRelation = (id, billbook) => {
    // current.loaded.relation = false
    api.relation.get(
      id,
      billbook ? { billbook: billbook } : undefined
    )
      .then(afterGetRelation)
      .catch(console.log)
      .finally(() => current.loaded.relation = true)
  }

  return {
    getRelation
  }
}

export default useRelationAction