import React from 'react'
import { Layout } from '../layout'
import Context from '../../store'
import { Button, List } from 'antd-mobile'
// import { Avatar } from 'antd
import Avatar from 'react-avatar'

export const Mine = () => {
  const { user_store, current } = Context.useStore()
  const handleLogout = e => {
    e.preventDefault()
    user_store.logoutFunc()
    current.user = undefined
  }
  const nickname = user_store.nickname
  const avatar = <Avatar
    size='50px'
    name={nickname}
    round
  />

  return Context.useConsumer(() => (
    <Layout>
        <List>
        <List.Item>
          {avatar}
        {nickname}
        </List.Item>
        </List>
        <Button type='warning' onClick={handleLogout}>退出登录</Button>
    </Layout>
  ))

}