import React from "react";
import Context from '../../store'

export const AccountHead = () => {
  const { accountList } = Context.useStore()
  return Context.useConsumer(() => (
    <div className='account-head'>
      <div className='account-head-title'>总资产</div>
      <div className='account-head-amount'>{accountList.total_amount}</div>
    </div>
  ));
};
