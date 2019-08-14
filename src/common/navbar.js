import React from 'react'
import { useRouter } from './router'
import { NavBar, Icon } from 'antd-mobile'


export const Bar = ({ title }) => {
  const router = useRouter()
  const handleBack = e => {
    e.preventDefault()
    router.history.goBack()
  }
  return <NavBar mode='light' icon={<Icon type='left' />} onLeftClick={handleBack}>{title}</NavBar>
}
