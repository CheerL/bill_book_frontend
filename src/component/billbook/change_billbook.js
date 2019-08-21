import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { Bar, BottomButton } from '../../common'
import { List, InputItem, Picker, Switch } from 'antd-mobile'
import { useLink } from '../../router'
import Context from '../../store'
import { setCurrentBillbook } from './common'
import bill from '../../store/bill';

export const ChangeBillbook = ({ match }) => {
  setCurrentBillbook(match.params)
  const goBack = useLink()
  const { billbook_store, current } = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const billbook = current.billbook
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(form => {
        billbook.status = form.status[0]
        billbook.name = form.name
        billbook.remark = form.remark
        if (!billbook.default) {
          billbook_store.defaultBillbook.default = false
          billbook.default = true
        }
        goBack()
      })
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
      <List>
        {getFieldDecorator('name')(
          <InputItem type='text' placeholder='账本名称'>
            账本名称
                </InputItem>
        )}
        {getFieldDecorator('remark')(
          <InputItem type='text' placeholder='备注'>
            备注
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
        <List.Item extra={getFieldDecorator('default', {
          valuePropName: 'checked'
        })(
          <Switch disabled={billbook.default} />
        )}>
          默认账本
              </List.Item>
      </List>
      <BottomButton onClick={handleSubmit}>修改账本</BottomButton>
    </>
  )
}