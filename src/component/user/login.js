import React from "react";
import useForm from "rc-form-hooks";
import { InputItem, Button } from "antd-mobile";

import { useUserAction } from '../../action'

import { UserBox } from "./box";

export const Login = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { login } = useUserAction()

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(login)
      .catch(console.log);
  };
  const links = [
    { path: "forget", text: "忘记密码" },
    { path: "register", text: "注册账号" }
  ];
  const title = "登录账号";

  return (
  <UserBox links={links} title={title}>
      {getFieldDecorator("username")(<InputItem type="text">账号</InputItem>)}
      {getFieldDecorator("password")(
        <InputItem type="password">密码</InputItem>
      )}
      <Button type="primary" onClick={handleSubmit}>
        登录
      </Button>
    </UserBox>
  )
};
