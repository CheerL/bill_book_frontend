import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { List, InputItem, Picker } from 'antd-mobile'

// import Context from '../../../store'
// import { useRouter } from '../../../router'
import { Bar, BottomButton } from '../../../common'
import { useBillbookAction } from '../../../action'

const NewBillbook = () => {
  // const router = useRouter()
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const { add } = useBillbookAction()
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(add)
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