import React from 'react'
import { Layout } from '../layout'
import Context from '../../store'
import { Button, Card, List } from 'antd-mobile'
import { Avatar } from 'antd'

export const Mine = () => {
  const { user_store, current } = Context.useStore()
  const handleLogout = e => {
    e.preventDefault()
    user_store.logoutFunc()
    current.user = undefined
  }
  const nickname = user_store.nickname
  const avatar = <Avatar
    size='large'
    // style={{ color: '#f56a00', backgroundColor: '#fde3cf', textAlign: 'center' }}
    shape='circle'>
    {nickname[0]}
  </Avatar>

  return Context.useConsumer(() => (
    <Layout>
      <div>
        {/* <List> */}
          {/* <List.Item> */}
            {avatar}
            {/* {nickname} */}
          {/* </List.Item> */}
        {/* </List> */}
        <Button type='warning' onClick={handleLogout}>退出登录</Button>
      </div>
    </Layout>
  ))

}