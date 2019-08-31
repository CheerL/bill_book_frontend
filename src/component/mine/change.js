import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import Context from '../../store'
import { useUserAction } from '../../action'
import { Bar, BottomButton } from "../../common";

const ChangeUser = () => {
  const { user } = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const { change } = useUserAction()

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(change)
      .catch(console.log)
  }

  useEffect(() => {
    setFieldsValue({
      nickname: user.nickname
    })
    // eslint-disable-next-line
  }, [])

  return <>
    <Bar title='修改用户信息' />
    <List className='padding-bottom'>
      {getFieldDecorator('nickname')(
        <InputItem type='text' placeholder='昵称'>
          昵称
        </InputItem>
      )}
    </List>
    <BottomButton type='primary' onClick={handleSubmit}>
      修改
     </BottomButton>
  </>
}

export default ChangeUser