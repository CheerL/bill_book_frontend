import React, { useEffect } from 'react'
import { WingBlank } from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { Bar, Remarked, Title, AccountHead, colorSpan, BottomButton, Iconed } from '../../../common'
import { useAccountAction } from '../../../action'
import { AccountDetailCard } from '../card'

const AccountDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { account_store, bill_store, current } = Context.useStore()
  const account = account_store.getAccount(id)
  const { changeDefault, remove, getAccounts } = useAccountAction()
  useEffect(() => {
    if (id) {
      getAccounts(id)
    }
    // eslint-disable-next-line
  }, [])
  if (account === undefined) {
    return <Redirect to={`/account/detail/${account_store.defaultAccount.id}`} />
  } else {
    current.account = account
  }


  const rightContent = [{
    value: 'change', content: '修改账户', onSelect: () => {
      router.history.push(`/account/change/${id}`)
    }
  }]
  const undefaultContent = [{
    value: 'default', content: '设为默认',
    onSelect: () => { changeDefault(id) }
  }, {
    value: 'delete', content: colorSpan('删除账户', 'red'),
    onSelect: () => { remove(id) }
  }]

  return Context.useConsumer(() => (
    <>
      <Bar
        title={<Remarked
          text={account.default ?
            <Iconed icon='star' theme='filled' text={account.name} /> :
            account.name}
          remark={account.remark}
          position='center'
        />}
        rightContent={account.default ? rightContent.concat(undefaultContent) : rightContent}
      />
      <AccountHead text='账户余额' amount={account.amount} />
      <WingBlank className='padding-bottom'>
        <Title title='账单列表' />
        {bill_store.filterByAccount(id, true).sort((a, b) => b.time - a.time).map(
          bill => <AccountDetailCard bill={bill} key={bill.id} space />
        )}
      </WingBlank>
      <BottomButton onClick={() => router.history.push('/account/transfer/new')} >
        发起转账
      </BottomButton>
    </>
  ))
}

export default AccountDetail