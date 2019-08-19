import React from 'react'
import Context from '../../store'
import { Bar, Remarked, Title, useRouter, useLink, AccountHead, colorSpan } from '../../common'
import { WingBlank, Button } from 'antd-mobile'
import { AccountDetailCard } from './card'

const AddTransfer = () => {
  const handleClick = useLink('/account/transfer/new')

  return <Button
    className='account-detail-add-transfer'
    type='primary'
    onClick={handleClick}
  >发起转账</Button>
}

export const AccountDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { account_store, bill_store, current } = Context.useStore()
  const account = account_store.getAccount(id)
  const barRightContent = [
    {
      value: 'change', context: '修改账户', onSelect: () => {
        router.history.push(`/account/change/${id}`)
      }
    },
    {
      value: 'delete', context: colorSpan('删除账户', 'red'), onSelect: () => {
        account_store.removeAccount(account)
        router.history.goBack()
      }
    },
  ]
  current.account = account

  return Context.useConsumer(() => (
    <>
      <Bar
        title={<Remarked text={account.name} remark={account.remark} position='center' />}
        rightContent={barRightContent}
      />
      <AccountHead text='账户余额' amount={account.amount} />
      <WingBlank className='account-detail-bill-list'>
        <Title title='账单列表' />
        {bill_store.filterByAccount(id).map(
          bill => <AccountDetailCard bill={bill} key={bill.id} space />
        )}
      </WingBlank>
      <AddTransfer />
    </>
  ))
}