import React from 'react'
import { Remarked } from '.'
import { WhiteSpace } from 'antd-mobile'
import './card.css'

const Card = ({ text, remark, amount, handleClick, context, space = false }) => {
    const cardContext = context ?
        <div className='card-center'>{context}</div> :
        <>
            <Remarked text={text} remark={remark} position='left' />
            <div className="card-amount">
                {amount}
            </div>
        </>
    const card = <div className="card" onClick={handleClick}>{cardContext}</div>
    return (space ? <>{card}<WhiteSpace sizs='sm' /></> : card)
}

export default Card