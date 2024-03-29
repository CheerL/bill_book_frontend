import React from 'react'
import { Button } from 'antd-mobile'

const Select = ({ data, value, onChange }) => {
  return <div className='am-list-item am-list-item-middle'>
    <div className='am-list-line' style={{paddingRight: '16px'}}>
      {data.map((item, index) =>
        <Button
          inline
          size='small'
          style={{flex: '1 1', maxWidth: '120px', margin: 'auto'}}
          key={index}
          type={(item.value === value) ? 'primary' : 'ghost'}
          onClick={e => {
            e.preventDefault()
            onChange(item.value)
            if (item.onClick) {
              item.onClick()
            }
          }}
        >
          {item.label}
        </Button>
      )}
    </div>
  </div>
}

export default Select