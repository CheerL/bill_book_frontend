import React from 'react'
import { Button } from 'antd-mobile'
import './bottom_button.css'

const BottomButton = ({ children, onClick, type = 'primary' }) => (
  <Button
    className='bottom-button'
    type={type}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default BottomButton