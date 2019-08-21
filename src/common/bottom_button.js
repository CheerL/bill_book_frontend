import React from 'react'
import { Button } from 'antd-mobile'
import './bottom_button.css'

const BottomButton = ({ children, onClick, style, type = 'primary' }) => (
  <Button
    className='bottom-button'
    type={type}
    onClick={onClick}
    style={style}
  >
    {children}
  </Button>
)

export default BottomButton