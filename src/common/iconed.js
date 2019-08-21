import React from 'react'
import { Icon } from 'antd'
import './iconed.css'

const Iconed = ({ icon, theme, text, className, iconClassName, textClassName }) => {
    const withSpace = text => text ? ` ${text}` : ''
    return (
        <div className={`iconed-box${withSpace(className)}`}>
            <Icon
                type={icon} theme={theme}
                className={`iconed-icon${withSpace(iconClassName)}`} />
            <span className={`iconed-text${withSpace(textClassName)}`}>{text}</span>
        </div>
    )
}

export default Iconed