const initIcon = [
  { icon: 'food', text: '餐饮' },
  { icon: 'salary', text: '工资' },
  { icon: 'shopping', text: '购物' },
  { icon: 'bus', text: '交通' },
  { icon: 'sing', text: '娱乐' },
  { icon: 'coin', text: '消费' },
  { icon: 'loan', text: '信贷' },
  { icon: 'house-rent', text: '住房' },
  { icon: 'transfer', text: '转账' },
  { icon: 'travel', text: '旅行' }
]

const IconStoreCreater = initValue => {
  const store = {
    icons: initValue.map(icon => ({
      icon: icon.icon,
      text: icon.text
    })),

    addIcon({ icon, text }) {
      this.icons.forEach(_icon => {
        if (_icon.text === text && _icon.icon !== icon) {
          _icon.icon = icon
          return
        }
      });
      this.icons.push({ icon, text })
    },
    removeIcon({ icon, text }) {
      this.icons.forEach(_icon => {
        if (_icon.text === text && _icon.icon === icon) {
          this.icons.remove({ _icon })
          return
        }
      })
    },
    getIcon(text) {
      return this.icons.find(icon => icon.text === text)
    }
  }
  return store
}

export default IconStoreCreater(initIcon)