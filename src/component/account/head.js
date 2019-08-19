import React from "react";

export const AccountHead = ({text, amount}) => {
  return (
    <div className='account-head'>
      <div className='account-head-title'>{text}</div>
      <div className='account-head-amount'>{amount}</div>
    </div>
  );
};
