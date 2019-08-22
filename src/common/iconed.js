import React from 'react'
import { Icon } from 'antd'
import './iconed.css'

const Iconed = ({ icon, theme, text, className, iconClassName, textClassName, right = false }) => {
    const withSpace = text => text ? ` ${text}` : ''
    const iconElement = <Icon key='icon' type={icon} theme={theme} className={`iconed-icon${withSpace(iconClassName)}`} />
    const textElement = <span key='text' className={`iconed-text${withSpace(textClassName)}`}>{text}</span>
    return (
        <div className={`iconed-box${withSpace(className)}`}>
            {right ? [textElement, iconElement] : [iconElement, textElement]}
        </div>
    )
}

export default Iconed