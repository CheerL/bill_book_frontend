const initCat = []

const CatStoreCreater = initValue => {
  const store = {
    cats: initValue.map(cat => ({
      icon: cat.icon,
      text: cat.text,
      billbook: cat.billbook,
      labels: cat.labels
    })),

    addCat({ icon, text, billbook, labels = [] }) {
      const cat = this.getCat(text, billbook)
      if (cat) {
        cat.icon = icon
        cat.labels = labels
      } else {
        this.cats.push({ icon, text, billbook, labels })
      }
    },
    removeCat({ text, billbook }) {
      const cat = this.getCat(text, billbook)
      if (cat) {
        this.cats.remove(cat)
      }
    },
    filterByBillbook(billbook) {
      return this.cats.filter(cat => cat.billbook === billbook)
    },
    getCat(text, billbook) {
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