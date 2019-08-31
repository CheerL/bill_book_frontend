import React from 'react'
import { InputItem } from 'antd-mobile'

const MoneyInput = ({ value, onChange, children, placeholder = '0', moneyKeyboardAlign = 'right' }) => {
  if (!onChange) {
    onChange = newValue => {
      value = newValue
    }
  }

  const handleChange = newValue => {
    const newNum = Number(newValue)
    if (!isNaN(newValue)) {
      const newStr = String(newNum)
      if (newValue.endsWith('.') && newValue.indexOf('.') === newValue.length - 1) {
        onChange(newStr.concat('.'))
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