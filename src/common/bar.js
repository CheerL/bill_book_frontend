import React from 'react'
import { useLink } from '../router'
import { NavBar, Icon, Popover } from 'antd-mobile'
import './bar.css'

const Content = ({ content }) => {
  let onSelect
  let visible = false
  const rightSelect = (onSelect = {}, content.forEach(item => { onSelect[item.value] = item.onSelect }), onSelect)
  const handleSelect = opt => {
    visible = false
    rightSelect[opt.props.value]()
  }

  return <Popover
    visible={visible}
    overlay={content.map(
      (item, key) =>
        <Popover.Item
          key={key}
          value={item.value}
        >{item.content}</Popover.Item>
    )}
    onVisibleChange={newVisible => visible = newVisible}
    onSelect={opt => handleSelect(opt)}
  ><Icon type='ellipsis' /></Popover>
}

const Bar = ({ title, rightContent = [], left = true }) => {
  const handleBack = useLink()
  const content = (rightContent && Array.isArray(rightContent) && rightContent.length > 0) ?
    <Content content={rightContent} /> :
    null

  return <NavBar
    mode='light'
    icon={left ? <Icon type='left' /> : null}
    onLeftClick={left ? handleBack: null}
    rightContent={content}
    className='bar-box'
  >
    {title}
  </NavBar>
}

export default Bar