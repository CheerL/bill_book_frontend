import React from 'react'
import { List } from 'antd-mobile'

export const unModifiedColor = '#bbb'

export const colorSpan = (text, color = 'black') => <span style={{color: color}}>{text}</span>

export const unSetText = colorSpan('未填写', unModifiedColor)

export const UnmodifiedItem = ({ children, text, extra, arrow = '' }) => (
    <List.Item extra={colorSpan(extra, unModifiedColor)} arrow={arrow}>
        {children ? children : colorSpan(text, unModifiedColor)}
    </List.Item>
)