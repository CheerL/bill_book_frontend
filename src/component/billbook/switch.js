import React, {useState} from 'react'
import { Icon } from 'antd'
import { Popover } from 'antd-mobile'
import { Remarked } from '../../common'
import Context from '../../store'
import { useLink } from '../../router'

export const BillbookSwitch = () => {
  const [visible, setVisible] = useState(false)
  const store = Context.useStore()
  const handleAdd = useLink('/billbook/new')
  if (store.current.billbook === undefined) {
    store.current.billbook = store.billbook_store.defaultBillbook
  }
  const billbooks = store.billbooksExceptCurrent
  const handleSelect = opt => {
    const id = opt.props.value
    if (id === '+') {
      handleAdd()
    } else {
      store.current.billbook = store.billbook_store.getBillbook(id)
    }
    setVisible(false)
  }
  const addBillbook = [
    { id: '+', name: <><Icon type="plus" size="xxs" />新建账本</> }
  ]

  return Context.useConsumer(() => (
    <Popover
      visible={visible}
      overlay={billbooks.concat(addBillbook).map(
        billbook =>
          <Popover.Item
            key={billbook.id}
            value={billbook.id}
            style={{textAlign: 'center'}}
          >{billbook.name}</Popover.Item>
      )}
      placement='bottom'
      onVisibleChange={setVisible}
      onSelect={handleSelect}
    >
      <div className={`billbook-switch-title${visible ? ' active' : ''}`} onClick={() => setVisible(true)} >
        <Remarked
          text={store.current.billbook.name}
          remark={
            store.current.billbook.remark.length < 7 ?
              store.current.billbook.remark :
              store.current.billbook.remark.slice(0, 6) + '...'
          }
          position='center'
        />
        <Icon type="caret-down" className='billbook-switch-downicon'/>
      </div>
    </Popover>
  ))

}