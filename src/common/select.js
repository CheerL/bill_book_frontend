import React from 'react'
import { Button } from 'antd-mobile'
import './select.css'

const Select = ({ data, value, onChange }) => {
  if (!value) {
    onChange(data[0].value)
  }
  return <div className='select-box'>
    {data.map((item, index) =>
      <Button
        inline
        size='small'
        className='select-button'
        key={index}
        type={item.value === value ? 'primary' : 'ghost'}
        onClick={e => {
          e.preventDefault()
          onChange(item.value)
        }}
      >
        {item.label}
      </Button>
    )}
  </div>
}

export default Select