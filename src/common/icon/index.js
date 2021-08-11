import React from 'react'
import { createFromIconfontCN } from '@ant-design/icons'
import typeDict from './type'


const url = '//at.alicdn.com/t/font_1379033_xhlfwfv9von.js'

const MyBaseIcon = createFromIconfontCN({
    scriptUrl: url
})

const MyIcon = ({ type, style, className }) => {
    return <MyBaseIcon type={typeDict[type]} style={style} className={className} />
}

export default MyIcon