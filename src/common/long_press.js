import { useState, useEffect, useCallback } from 'react';
import { Modal } from 'antd-mobile'
import { useBillAction, useAccountAction } from '../action'
import { useLink } from '../router'
import { colorSpan } from './color'

const useLongPress = (callback = () => { }, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => clearTimeout(timerId);
    // eslint-disable-next-line
  }, [startLongPress]);

  const start = useCallback(() => setStartLongPress(true), []);
  const stop = useCallback(() => setStartLongPress(false), []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    // onContextMenu: callback
  };
}

export const useBillLongPress = bill => {
  const handleChange = useLink(`/billbook/bill/change/${bill.id}`)
  const { removePure } = useBillAction()
  const onLongPress = () => Modal.operation([
    {
      text: '修改账单',
      onPress: () => handleChange()
    },
    {
      text: colorSpan('删除账单', 'red'),
      onPress: () => removePure(bill.id)
    }
  ])
  return onLongPress
}

export const useTransferLongPress = transfer => {
  const handleChange = useLink(`/account/transfer/change/${transfer.id}`)
  const { removePure } = useBillAction()
  const onPress = () => Modal.operation([
    {
      text: '修改转账',
      onPress: () => handleChange()
    },
    {
      text: colorSpan('删除转账', 'red'),
      onPress: () => removePure(transfer.id)
    }
  ])
  return onPress
}

export const useAccountLongPress = account => {
  const handleChange = useLink(`/account/change/${account.id}`)
  const { changeDefault, remove } = useAccountAction()
  const content = [{
    text: '修改账户',
    onPress: () => handleChange()
  }]
  const undefaultContent = [{
    text: '设为默认',
    onPress: () => changeDefault(account.id)
  }, {
    text: colorSpan('删除账户', 'red'),
    onPress: () => remove(account.id)
  }]

  const onLongPress = () => Modal.operation(account.default ? content : content.concat(undefaultContent))
  return onLongPress
}

export default useLongPress