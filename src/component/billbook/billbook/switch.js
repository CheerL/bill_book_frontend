import React, { useState } from 'react'
import { CaretDownOutlined } from '@ant-design/icons'
import { Popover } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { Remarked, Iconed, longStringCut } from '../../../common'
import { object_map } from '../../../common/object'

import './switch.css'

const BillbookSwitch = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const store = Context.useStore()
  const billbooks = store.billbooksExceptCurrent
  const handleSelect = opt => {
    const id = opt.props.value
    if (id === '+') {
      router.history.push('/billbook/new')
    } else {
      const billbook = store.billbook_store.getBillbook(id)
      if (billbook) {
        router.history.push(`/billbook/detail/${id}`)
        store.current.billbook = billbook
      }
    }
    setVisible(false)
  }
  const textCreater = () => {
    const currentBillbook = store.current.billbook
    return currentBillbook ? (
      store.current.isDefaultBillbook ?
        <Iconed icon='star' theme='filled' text={currentBillbook.name} />:
        currentBillbook.name) :
      ''
  }
  const remarkCreater = () => {
    const currentBillbook = store.current.billbook
    return currentBillbook ? longStringCut(currentBillbook.remark, 6) : ''
  }

  return Context.useConsumer(() => (
    <Popover
      visible={visible}
      overlay={object_map(billbooks,
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
          // text={store.current.isDefaultBillbook ?
          //   <Iconed icon='star' theme='filled' text={store.current.billbook?.name} />:
          //   store.current.billbook?.name
          // }
          text={textCreater()}
          remark={remarkCreater()}
          position='center'
        />
        <CaretDownOutlined className='billbook-switch-downicon'/>
      </div>
    </Popover>
  ))

}

export default BillbookSwitch