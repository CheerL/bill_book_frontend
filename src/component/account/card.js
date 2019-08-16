import React from "react";
import { Icon } from "antd-mobile";
import { useRouter } from '../../common/router'
import Context from '../../store'

export const AccountCard = ({ account }) => {
  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.history.push(`${router.location.pathname}/detail/${account.id}`)
  }

  return Context.useConsumer(() => (
    <div className="account-card" onClick={handleClick}>
      <div className="account-card-title account-card-context">
        <div>{account.name}</div>
        <div className="account-card-remark">{account.remark}</div>
      </div>
      <div className="account-card-amount account-card-context">
        {account.amount}
      </div>
    </div>
  ));
};

export const AccountNew = () => {
  const router = useRouter()
  const handleClick = e => {
    e.preventDefault()
    router.history.push('/account/new')
  }
  return (
    <div className="account-card" onClick={handleClick}>
      <div className="account-card-context account-card-new">
        <Icon type="plus" size="xxs" />
        新建账本
      </div>
    </div>
  );
};
