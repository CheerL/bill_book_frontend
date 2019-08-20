import React from 'react'
import { List } from 'antd-mobile'
import { colorSpan } from '.'

const unModifiedColor = '#bbb'

const UnmodifiedItem = ({ children, text, extra, arrow = 'horizontal' }) => (
    <List.Item extra={colorSpan(extra, unModifiedColor)} arrow={arrow}>
        {children ? children : colorSpan(text, unModifiedColor)}
    </List.Item>
)

export default UnmodifiedItem