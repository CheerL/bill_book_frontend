import React from "react";
import useForm from "rc-form-hooks";
import { InputItem, Button, Toast } from "antd-mobile";

import { useErrorHandle } from '../../common'
import { useUserAction } from '../../action'

import { UserBox } from "./box";

export const Forget = () => {
  const { getFieldDecorator, validateFields, getFieldValue, getFieldError } = useForm();
  const { forget } = useUserAction()

  const usernameError = useErrorHandle(getFieldError, 'username')
  const passwordError = useErrorHandle(getFieldError, 'password')
  const checkError = useErrorHandle(getFieldError, 'check_password')
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(forget)
      .catch(error => Toast.info(error.message));
  };
  const links = [{ path: "login", text: "返回登录" }];
  const title = '修改密码'

  return (
    <UserBox links={links} title={title}>
      {getFieldDecorator("username", {
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 4, message: '用户名过短' },
          { max: 20, message: '用户名过长' }
        ]
      })(<InputItem type="text" {...usernameError}>账号</InputItem>)}
      {getFieldDecorator("password", {
        rules: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码过短' },
          { max: 20, message: '密码过长' }
        ]
      })(<InputItem type="password" {...passwordError}>密码</InputItem>)}
      {getFieldDecorator("check_password", {
        rules: [
          { required: true, message: '请重新输入密码' },
          {
            validator: (_, value, callback) => callback(
              value === getFieldValue('password') ?
                undefined : '密码不一致'
            ),
            message: '密码不一致'
          }
        ]
      })(<InputItem type="password" {...checkError}>确认密码</InputItem>)}
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </UserBox>
  );
};
