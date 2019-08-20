import React from "react";
import { Icon } from 'antd'
import './head.css'

export const AccountHead = ({ text, amount }) => {
  return (
    <div className='head-box'>
      <div>
        <div className='head-text'>{text}</div>
        <div className='head-amount'>{amount}</div>
      </div>
    </div>
  );
};

export const DetailHead = ({ text, amount, icon }) => {
  return (
    <div className='head-box'>
      <div className='detail-head-box'>
        <div className='detail-head-text'>
          {icon ? <Icon type={icon} className='detail-head-icon' /> : null}
          {text}
        </div>
        <div className='detail-head-amount'>
          {amount}
        </div>
      </div>
    </div>)
}