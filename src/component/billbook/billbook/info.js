import React from 'react'
import { List, WhiteSpace, Switch } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import Avatar from 'react-avatar'
// import { useBillAction } from '../../../action'
import { Bar, unSetText, UserAvatar } from '../../../common'


const BillbookInfo = ({ match }) => {
  const { billbook_store, relation_store, current, user } = Context.useStore()
  const router = useRouter()
  const id = match.params.id
  const billbook = billbook_store.getBillbook(id)

  const remark = billbook.remark ? billbook.remark : unSetText
  const status = ['自由', '公开', '私有']

  current.billbook = billbook

  const rightContent = [{
    value: 'change', content: '修改账本', onSelect: () => {
      router.history.push(`/billbook/change/${id}`)
    }
  }]

  return (
    <>
      <Bar title={billbook.name} rightContent={rightContent} />
      <div className='billbook-info-user'>
        <div className='billbook-info-user-box'>
          {relation_store.filterByBillbook(billbook.id).map(user => (
            <div className='billbook-info-user-avatar' key={user.nickname}>
              <UserAvatar user={user} />
              {/* <div style={{display: 'inline'}}>{user.nickname}</div> */}
            </div>
          ))}
          <div className='billbook-info-user-avatar'>
            <Avatar color='#f5f5f9' fgColor='black' name='+' size='50px' textSizeRatio={1.5} round />
          </div>
        </div>
      </div>
      <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
      <List>
        <List.Item extra={billbook.name}>账本名称</List.Item>
        <List.Item extra={status[billbook.status]}>账本状态</List.Item>
        <List.Item extra={
          <Switch checked={billbook.default} disabled={true} />
        }>
          默认账本
        </List.Item>
        <List.Item extra={remark}>备注</List.Item>
      </List>
    </>
  )
}

export default BillbookInfo