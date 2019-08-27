import React from "react";
import useForm from "rc-form-hooks";
import { Button, InputItem } from "antd-mobile";

import { useUserAction } from '../../action'

import { UserBox } from "./box";

export const Register = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { register } = useUserAction()
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(register)
      .catch(console.log);
  };
  const links = [{ path: "login", text: "返回登录" }];
  const title = '注册账号'

  return (
    <UserBox links={links} title={title}>
      {getFieldDecorator("username")(<InputItem type="text">账号</InputItem>)}
      {getFieldDecorator("password")(
        <InputItem type="password">密码</InputItem>
      )}
      {getFieldDecorator("check_password")(
        <InputItem type="password">确认密码</InputItem>
      )}
      {getFieldDecorator("nickname")(<InputItem type="text">昵称</InputItem>)}
      <Button type="primary" onClick={handleSubmit}>
        注册
      </Button>
    </UserBox>
  );
};
