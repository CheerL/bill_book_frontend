import React from 'react'
import { PlusOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import './iconed.css'

const iconMap = {
    'plus': PlusOutlined,
    'star': StarOutlined,
    'starfilled': StarFilled
}

const Iconed = ({ icon, theme, text, className, iconClassName, textClassName, right = false, position = 'center' }) => {
    const withSpace = text => text ? ` ${text}` : ''
    const IconType = iconMap[icon + (theme ? theme : '')]
    const iconElement = IconType ? <IconType key='icon' className={`iconed-icon${withSpace(iconClassName)}`} /> : null
    const textElement = <span key='text' className={`iconed-text${withSpace(textClassName)}`}>{text}</span>
    return (
        <div className={`iconed-box${withSpace(className)}`} style={{justifyContent: position}}>
            {right ? [textElement, iconElement] : [iconElement, textElement]}
        </div>
    )
}

export default Iconed