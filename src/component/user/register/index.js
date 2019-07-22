import { Button, InputItem, List } from 'antd-mobile';
import { useRouter } from '../../../common/router'
import React from 'react';
import useForm from 'rc-form-hooks'
import '../index.css';

export const Register = () => {
  const { getFieldDecorator, validateFields } = useForm()
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    validateFields().then(console.log)
  }
  return <div className='userBox'>
    <List>
      {getFieldDecorator('username')(<InputItem type='text'>账号</InputItem>)}
      {getFieldDecorator('password')(<InputItem type='password'>密码</InputItem>)}
      {getFieldDecorator('check_password')(<InputItem type='password'>确认密码</InputItem>)}
      {getFieldDecorator('nickname')(<InputItem type='test'>昵称</InputItem>)}
      <Button type='primary' onClick={handleSubmit}>注册</Button>
      <Button onClick={() => { router.history.push('/login') }}>返回登录</Button>
    </List>
  </div>
}