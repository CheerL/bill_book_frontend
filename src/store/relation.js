const RelationStoreCreater = initValue => {
  const store = {
    relation: initValue.map(r => ({
      billbook: r.billbook,
      status: r.status,
      avatar: r.user.avatar,
      nickname: r.user.nickname
    })),

    getRelation(billbook, nickname) {
      return this.relation.find(r => (
        r.billbook === billbook &&
        r.nickname === nickname
      ))
    },

    addRelation(relation) {
      const r = this.getRelation(relation.billbook, relation.nickname)
      if (r) {
        r.status = relation.status
        r.avater = relation.avater
      } else {
        this.relation.push({
          billbook: relation.billbook,
          status: relation.status,
          avatar: relation.user.avatar,
          nickname: relation.user.nickname
        })
      }
    },

    removeRelation(relation) {
      const r = this.getRelation(relation.billbook, relation.nickname)
      if (r) {
        this.relation.remove(r)
      }
    },

    filterByBillbook(billbook) {
      return this.relation.filter(r => r.billbook === billbook)
    }
  }
  return store
}

export default RelationStoreCreater([])