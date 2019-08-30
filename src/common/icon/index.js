import React from 'react'
import { Icon } from 'antd'
import typeDict from './type'


const url = '//at.alicdn.com/t/font_1379033_565jofmkv0b.js'

const MyBaseIcon = Icon.createFromIconfontCN({
    scriptUrl: url
})

const MyIcon = ({ type, style, className }) => {
    return <MyBaseIcon type={typeDict[type]} style={style} className={className} />
}

export default MyIcon