import React from "react";
import { MyIcon as Icon } from '.'
import './head.css'

export const AccountHead = ({ text, amount }) => {
  return (
    <div className='head-box-wrap'>
      <div>
        <div className='account-head-text'>{text}</div>
        <div className='account-head-amount'>{amount}</div>
      </div>
    </div>
  );
};

const BasicHead = ({ title, extra, icon, className, titlaClassName, extraClassName, onClick }) => {
  const withSpace = text => text ? ` ${text}` : ''
  return (
    <div className={`head-box-wrap${withSpace(className)}`} onClick={onClick} >
      <div className={`head-box${withSpace(className)}`}>
        <div className={`head-title${withSpace(titlaClassName)}`}>
          {icon}
          {title}
        </div>
        <div className={`head-extra${withSpace(extraClassName)}`}>
          {extra}
        </div>
      </div>
    </div>)
}

export const DetailHead = ({ text, amount, icon, onClick }) => {
  const detialIcon = icon ? <Icon type={icon} className='detail-head-icon' /> : null
  return BasicHead({ title: text, icon: detialIcon, extra: amount, extraClassName: 'detail-head-amount', onClick })
}

export const AvatarHead = ({ title, avatar, extra, className, extraClassName, onClick }) => {
  return BasicHead({ title, icon: avatar, extra, className, extraClassName, onClick })
}