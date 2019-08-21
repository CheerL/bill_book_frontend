import React, { useState } from 'react'
import { Icon } from 'antd'
import { Popover } from 'antd-mobile'
import { Remarked, Iconed } from '../../common'
import Context from '../../store'
import { useRouter } from '../../router'

export const BillbookSwitch = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const store = Context.useStore()
  const billbooks = store.billbooksExceptCurrent
  const handleSelect = opt => {
    const id = opt.props.value
    if (id === '+') {
      router.history.push('/billbook/new')
    } else {
      router.history.push(`/billbook/detail/${id}`)
    }
    setVisible(false)
  }

  return Context.useConsumer(() => (
    <Popover
      visible={visible}
      overlay={billbooks.map(
        billbook =>
          <Popover.Item
            key={billbook.id}
            value={billbook.id}
            className='billbook-switch-popover-item'
          >{billbook.default ?
            <Iconed icon='star' text={billbook.name} /> :
            billbook.name
            }</Popover.Item>
      ).concat(<Popover.Item
        key='+'
        value='+'
        className='billbook-switch-popover-item'
      >
        <Iconed icon="plus" text='新建账本' />
      </Popover.Item>)}
      placement='bottom'
      onVisibleChange={setVisible}
      onSelect={handleSelect}
    >
      <div className={`billbook-switch-title${visible ? ' active' : ''}`} onClick={() => setVisible(true)} >
        <Remarked
          text={store.current.isDefaultBillbook ?
            <Iconed icon='star' theme='filled' text={store.current.billbook.name} />:
            store.current.billbook.name
          }
          remark={
            store.current.billbook.remark.length < 7 ?
              store.current.billbook.remark :
              store.current.billbook.remark.slice(0, 6) + '...'
          }
          position='center'
        />
        <Icon type="caret-down" className='billbook-switch-downicon' />
      </div>
    </Popover>
  ))

}