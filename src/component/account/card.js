import React from "react";
import { Icon } from "antd-mobile";
import { Card } from '../../common'
import { useLink } from '../../router'
import Context from '../../store'

export const AccountCard = ({ account, space = false }) => {
  const handleClick = useLink(`account/detail/${account.id}`)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={account.name}
      remark={account.remark}
      amount={account.amount}
      space={space}
    />
  ));
};

export const AccountNew = () => {
  const handleClick = useLink('/account/new')

  return (
    <Card
      handleClick={handleClick}
      context={<>
        <Icon type="plus" size="xxs" />
        新建账本
      </>}
      position='center'
      space
    />
  );
};

const BillCard = ({ bill, space = false }) => {
  const handleClick = useLink(`/billbook/bill/detail/${bill.id}`)

  return Context.useConsumer(() => (
    <Card
      handleClick={handleClick}
      text={bill.cat_0}
      remark={bill.remark}
      amount={bill.amount}
      space={space}
    />
  ))
}

const TransferCard = ({bill, space=false}) => {
  const handleClick = useLink(`/account/transfer/detail/${bill.id}`)
  const { account_store, current } = Context.useStore()
  bill.setAccount(current.account)
  bill.setTarget(account_store)

  return Context.useConsumer(() => (
    <Card
    handleClick={handleClick}
    text='转账'
    remark={bill.transfer_remark}
    amount={bill.transfer_amount}
    space={space}
    />
  ))
}

export const AccountDetailCard = ({bill, space=false}) => (
  bill.isTransfer ?
  <TransferCard bill={bill} space={space} /> :
  <BillCard bill={bill} space={space} />
)