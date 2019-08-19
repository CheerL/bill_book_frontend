import React from 'react'
import Context from '../../store'
import { Bar, useLink } from '../../common'
import { List } from 'antd-mobile'

export const TransferDetail = ({ match }) => {
    const goBack = useLink()
    const id = match.params.id
    const {bill_store} = Context.useStore()
    const bill = bill_store.getBill(id)

    const rightContent = [
        {value: 'delete', context: '删除转账', onSelect: () => {
            bill_store.removeBill(bill)
            goBack()
        }}
    ]
    return (
        <>
        <Bar title='转账' rightContent={rightContent} />
        <List>
            
        </List>
        </>
    )
}