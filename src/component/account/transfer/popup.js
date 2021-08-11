import React, { useState } from 'react'
import Cascader from 'rmc-cascader'
import Popup from 'rmc-cascader/lib/Popup'

import Context from '../../../store'
import { useLink } from '../../../router'
import { object_map } from '../../../common/object'

import 'antd-mobile/lib/picker/style/css'

const AccountPopup = () => {
  const { account_store, current } = Context.useStore()
  const goBack = useLink()
  const data = object_map(account_store.accounts,
    account => ({ value: account.id, label: account.name })
  )
  const cascader = <Cascader
    data={data}
    cols={1}
    prefixCls='am-picker'
    pickerPrefixCls='am-picker-col'
  ></Cascader>
  const [visible, setVisible] = useState(current.account === undefined)

  return <Popup
    cascader={cascader}
    onChange={([id]) => {
      current.account = account_store.getAccount(id)
      setVisible(false)
    }}
    title='选择账户'
    visible={visible}
    prefixCls='am-picker-popup'
    dismissText='返回'
    okText='确定'
    onDismiss={goBack}
  />
}

export default AccountPopup