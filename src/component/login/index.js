import React from 'react'
import { InputItem, Button } from 'antd-mobile'
import './index.css'

export const Login = () => (
    <div className='loginBox'>
        <div>
            <InputItem type='text' value=''>账号</InputItem>
            <InputItem type='password' value=''>密码</InputItem>
            <Button type='primary'>登录</Button>
            <Button>注册</Button>
        </div>
    </div>
)
