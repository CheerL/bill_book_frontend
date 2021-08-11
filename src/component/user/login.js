import React from "react";
import useForm from "rc-form-hooks";
import { InputItem, Button, Toast } from "antd-mobile";

import { useErrorHandle } from '../../common'
import { useUserAction } from '../../action'

import { UserBox } from "./box";

export const Login = () => {
  const { getFieldDecorator, validateFields, getFieldError } = useForm();
  const { login } = useUserAction()
  const usernameError = useErrorHandle(getFieldError, 'username')
  const passwordError = useErrorHandle(getFieldError, 'password')

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(login)
      .catch(error => Toast.info(error.message));
  };
  const links = [
    { path: "forget", text: "忘记密码" },
    { path: "register", text: "注册账号" }
  ];
  const title = "登录账号";

  return (
    <UserBox links={links} title={title}>
      {getFieldDecorator("username", {
        rules: {
          required: true,
          message: '请输入用户名'
        }
      })(<InputItem type="text" {...usernameError}>账号</InputItem>)}
      {getFieldDecorator("password", {
        rules: {
          required: true,
          message: '请输入密码'
        }
      })(<InputItem type="password" {...passwordError}>密码</InputItem>)}
      <Button type="primary" onClick={handleSubmit}>
        登录
      </Button>
    </UserBox>
  )
};
