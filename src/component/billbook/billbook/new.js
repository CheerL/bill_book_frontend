import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { List, InputItem, Picker } from 'antd-mobile'

import Context from '../../../store'
import { useRouter } from '../../../router'
import { Bar, BottomButton } from '../../../common'

const NewBillbook = () => {
  const router = useRouter()
  const { billbook_store } = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(form => {
        form.id = Math.random().toString().substring(3, 6)
        form.remark = form.remark ? form.remark : ''
        form.status = form.status[0]
        form.default = false
        billbook_store.addBillbook(form)
        router.history.push(`/billbook/detail/${form.id}`)
      })
      .catch(console.log)
  }
  useEffect(() => {
    setFieldsValue({
      status: [1],
    })
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <Bar title='新建账本' />
      <List className='padding-bottom'>
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
      </List>
      <BottomButton onClick={handleSubmit}>新建</BottomButton>
    </>
  )
}

export default NewBillbook