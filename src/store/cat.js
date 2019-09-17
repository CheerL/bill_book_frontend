const initCat = []

const CatStoreCreater = initValue => {
  const store = {
    cats: initValue.map(cat => ({
      id: cat._id,
      icon: cat.icon,
      text: cat.text,
      billbook: cat.billbook,
      labels: cat.labels
    })),

    addCat(cat) {
      cat.id = cat._id
      cat.labels = cat.labels ? cat.labels : []
      delete cat._id

      const catStore = this.getCat(cat.text, cat.billbook)
      if (catStore) {
        catStore.icon = cat.icon
        catStore.labels = cat.labels
      } else {
        this.cats.push(cat)
      }
    },
    removeCat(text, billbook, cat) {
      if (!cat) {
        cat = this.getCat(text, billbook)
      }

      if (cat) {
        this.cats.remove(cat)
      }
    },
    filterByBillbook(billbook) {
      return this.cats.filter(cat => cat.billbook === billbook)
    },
    getCat(text, billbook, id) {
      if (id) {
        return this.cats.find(cat => cat.id === id)
      }
      return this.cats.find(cat => cat.text === text && cat.billbook === billbook)
    },
    addCatLabel(text, billbook, label) {
      const cat = this.getCat(text, billbook)
      if (!cat) {
        return
      }
      if (!cat.labels.find(label)) {
        cat.labels.push(label)
      }
    },
    removeCatLabel(text, billbook, label) {
      const cat = this.getCat(text, billbook)
      if (!cat) {
        return
      }
      cat.labels.remove(label)
    }
  }
  return store
}

export default CatStoreCreater(initCat)