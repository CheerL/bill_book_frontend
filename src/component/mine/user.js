import React from 'react'
import { Bar, BottomButton, colorSpan } from '../../common'
import Context from '../../store'
import api from '../../action/api'


export const UserDetail = () => {
  const { user } = Context.useStore()
  const handleLogout = e => {
    e.preventDefault()
    user.logoutFunc()
  }
  const rightContent = [{
    value: 'delete', content: colorSpan('删除用户', 'red'),
    onSelect: () => {
      api.user.delete()
        .then(() => user.logoutFunc())
        .catch(console.log)
    }
  }]
  return (
    <>
      <Bar title='用户详情' rightContent={rightContent} />
      <BottomButton type='warning' onClick={handleLogout}>退出登录</BottomButton>
    </>
  )
}