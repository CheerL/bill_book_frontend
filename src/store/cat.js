const initCat = [
  { icon: 'food', text: '餐饮', labels: ['早餐', '中餐', '晚餐'] },
  { icon: 'salary', text: '工资', labels: [] },
  { icon: 'shopping', text: '购物', labels: [] },
  { icon: 'bus', text: '交通', labels: [] },
  { icon: 'sing', text: '娱乐', labels: [] },
  { icon: 'coin', text: '消费', labels: [] },
  { icon: 'loan', text: '信贷', labels: [] },
  { icon: 'house-rent', text: '住房', labels: [] },
  { icon: 'transfer', text: '转账', labels: [] },
  { icon: 'travel', text: '旅行', labels: [] }
]

const CatStoreCreater = initValue => {
  const store = {
    cats: initValue.map(cat => ({
      icon: cat.icon,
      text: cat.text,
      billbook: cat.billbook,
      labels: cat.labels
    })),

    addCat({ icon, text, billbook, labels = [] }) {
      this.cats.forEach(cat => {
        if (cat.text === text && cat.billbook === billbook) {
          cat.icon = icon
          cat.labels = labels
          return
        }
      });
      this.cats.push({ icon, text, billbook, labels })
    },
    removeCat({ billbook, text }) {
      this.cats.forEach(cat => {
        if (cat.text === text && cat.billbook === billbook) {
          this.cats.remove({ cat })
          return
        }
      })
    },
    getCat(text, billbook = undefined) {
      return this.cats.find(cat => cat.text === text)
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