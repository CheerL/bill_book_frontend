import React, { useState } from 'react'
import { Layout } from '../layout'
import Context from '../../store'
import { List, WhiteSpace } from 'antd-mobile'
import { AvatarHead, UserAvatar, Remarked } from '../../common'
import { SwitchRoute, useRouter, useLink } from '../../router'
import './index.css'

import UserDetail from './user'
import ChangeUser from './change'

const MineUserHead = () => {
  const { user } = Context.useStore()
  const [active, setActive] = useState(false)
  const avatar = <UserAvatar user={user} className='mine-avatar' />
  const title = <Remarked text={user.nickname} remark={`账号: ${user.username}`} />
  const switchActive = () => {
    setActive(!active)
  }
  const handleClick = useLink('/mine/user')
  return (
    <List.Item
      arrow='horizontal'
      style={{ height: '100px' }}
      onMouseDown={switchActive}
      onMouseUp={switchActive}
      onTouchStart={switchActive}
      onTouchEnd={switchActive}
      onClick={handleClick}
    >
      <AvatarHead title={title} avatar={avatar} className={active ? 'mine-user-head mine-user-head-active' : 'mine-user-head'} />
    </List.Item>
  )
}

const MineIndex = () => {
  const router = useRouter()
  return Context.useConsumer(() => (
    <Layout>
      <List>
        <MineUserHead />
        <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
        <List.Item arrow='horizontal' onClick={() => router.history.push('/mine/setting')}>设置</List.Item>
      </List>
    </Layout>
  ))
}

export const Mine = () => <SwitchRoute router_map={[
  { path: '/mine', component: MineIndex, exact: true },
  { path: '/mine/user', component: UserDetail },
  { path: '/mine/change', component: ChangeUser },
  { path: '/mine' }
]} />