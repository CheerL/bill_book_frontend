import React from 'react'
import Context from '../../store'
import { Bar } from '../../common/navbar'
import { useRouter } from '../../common/router'

export const AccountDetail = ({ match }) => {
  const router = useRouter()
  const id = match.params.id
  const { accountList } = Context.useStore()
  const account = accountList.getAccount(id)

  return Context.useConsumer(() => (
    <>
    <Bar title={account.name} />
    {account.amount}
    </>
  ))
}