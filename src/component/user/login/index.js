import React from 'react'
import { InputItem, Button, List } from 'antd-mobile'
import { useRouter } from '../../../common/router'
import useForm from 'rc-form-hooks'
import '../index.css'

export const Login = () => {
  const { getFieldDecorator, validateFields } = useForm()
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    validateFields().then(console.log)
  }
  return <div className='userBox'>
    <List>
      {getFieldDecorator('username')(<InputItem type='text' value=''>账号</InputItem>)}
      {getFieldDecorator('password')(<InputItem type='password' value=''>密码</InputItem>)}
      <Button type='primary' onClick={handleSubmit}>登录</Button>
      <Button onClick={() => router.history.push('/register')}>注册</Button>
    </List>
  </div>
}
