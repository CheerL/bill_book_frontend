import React from 'react'
import { useLink } from '.'
import { NavBar, Icon, Popover } from 'antd-mobile'

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
        >{item.context}</Popover.Item>
    )}
    onVisibleChange={newVisible => visible = newVisible}
    onSelect={opt => handleSelect(opt)}
  ><Icon type='ellipsis' /></Popover>
}

const Bar = ({ title, rightContent = [] }) => {
  const handleBack = useLink()
  const content = (rightContent && Array.isArray(rightContent) && rightContent.length > 0) ?
    <Content content={rightContent} /> :
    null

  return <NavBar
    mode='light'
    icon={<Icon type='left' />}
    onLeftClick={handleBack}
    rightContent={content}
    style={{
      // borderBottom: '1px solid #f1f1f1'
    }}
  >
    {title}
  </NavBar>
}

export default Bar