import React from 'react'
import { Remarked } from '.'
import { WhiteSpace } from 'antd-mobile'
import Icon from './icon'
import './card.css'

import useLongPress from './long_press'

const Card = ({ text, remark, amount, handleClick, onLongPress, context, icon, space = false }) => {
  const longPress = useLongPress(onLongPress)
  const cardContext = context ?
    <div className='card-center'>{context}</div> :
    <>
      {icon ? <Icon type={icon} className='card-icon' /> : null}
      <Remarked text={text} remark={remark} position='left' />
      <div className="card-amount">
        {amount.toString()}
      </div>
    </>
  const card = <div className="card" onClick={handleClick} {...longPress}>{cardContext}</div>
  return (space ? <>{card}<WhiteSpace sizs='sm' /></> : card)
}

export default Card