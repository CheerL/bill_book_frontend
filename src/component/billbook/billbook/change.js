import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { List, InputItem, Picker, Switch } from 'antd-mobile'

import Context from '../../../store'
import { useLink } from '../../../router'
import { Bar, BottomButton, colorSpan, unModifiedColor } from '../../../common'
import { useBillbookAction } from '../../../action'

const ChangeBillbook = ({ match }) => {
  const goBack = useLink()
  const { billbook_store, current } = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const { change } = useBillbookAction()
  const billbook = current.billbook = billbook_store.getBillbook(match.params.id)
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(change)
      .catch(console.log)
  }
  useEffect(() => {
    setFieldsValue({
      name: billbook.name,
      remark: billbook.remark,
      status: [billbook.status],
      default: billbook.default
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Bar title={billbook.name} />
      <List className='padding-bottom'>
        {getFieldDecorator('name')(
          <InputItem type='text' placeholder='账本名称'>
            账本名称
                </InputItem>
        )}

        {getFieldDecorator('status')(
          <Picker cols={1} data={[
            { value: 0, label: '自由' },
            { value: 1, label: '公开' },
            { value: 2, label: '私有' }
          ]}>
            <List.Item>账本状态</List.Item>
          </Picker>
        )}
        <List.Item extra={getFieldDecorator('default', { valuePropName: 'checked' })(
          <Switch disabled={billbook.default} />
        )}>
          {colorSpan('默认账本', billbook.default ? unModifiedColor : 'black')}
        </List.Item>
        {getFieldDecorator('remark')(
          <InputItem type='text' placeholder='备注'>
            备注
          </InputItem>
        )}
      </List>
      <BottomButton onClick={handleSubmit}>修改</BottomButton>
    </>
  )
}

export default ChangeBillbook