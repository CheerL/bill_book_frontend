import React from 'react'
import { InputItem } from 'antd-mobile'

const MoneyInput = ({ value, onChange, children, placeholder = '0', moneyKeyboardAlign = 'right' }) => {
  if (!onChange) {
    onChange = newValue => {
      value = newValue
    }
  }

  const handleChange = newValue => {
    let newNum = Number(newValue)
    if (newValue === '.') {
      newNum = 0
    }

    if (!isNaN(newNum)) {
      const pointPos = newValue.indexOf('.')
      const newStr = String(newNum)

      if (newValue === '.') {
        onChange('0.')
      } else if (pointPos === newValue.length - 1 && newValue) {
        onChange(newStr.concat('.'))
      } else if (pointPos !== -1 && pointPos < newValue.length - 3) {
        ;
      } else if (newValue.endsWith('.0')) {
        onChange(newStr.concat('.0'))
      } else if (newValue.endsWith('.00')) {
        onChange(newStr.concat('.00'))
      } else {
        onChange(newStr)
      }
    }
  }

  return <InputItem
    type='money'
    placeholder={placeholder}
    value={value}
    onChange={handleChange}
    moneyKeyboardAlign={moneyKeyboardAlign}
  >
    {children}
  </InputItem>
}

export default MoneyInput