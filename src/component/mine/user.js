import React from 'react'
import { Bar, BottomButton } from '../../common'
import Context from '../../store'

export const UserDetail = () => {
  const { user } = Context.useStore()
  const handleLogout = e => {
    e.preventDefault()
    user.logoutFunc()
  }
  return (
    <>
      <Bar title='用户详情' />
      <BottomButton type='warning' onClick={handleLogout}>退出登录</BottomButton>
    </>
  )
}