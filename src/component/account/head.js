import React from "react";

export const AccountHead = ({ amount }) => {
  return (
    <div className='account-head'>
      <div className='account-head-title'>总资产</div>
      <div className='account-head-amount'>{amount}</div>
    </div>
  );
};
