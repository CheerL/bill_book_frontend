import React from "react";
import useForm from "rc-form-hooks";
import { InputItem, Button } from "antd-mobile";

import { useUserAction } from '../../action'

import { UserBox } from "./box";

export const Forget = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { forget } = useUserAction()

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(forget)
      .catch(console.log);
  };
  const links = [{ path: "login", text: "返回登录" }];
  const title = '修改密码'

  return (
    <UserBox links={links} title={title}>
      {getFieldDecorator("username")(<InputItem type="text">账号</InputItem>)}
      {getFieldDecorator("password")(
        <InputItem type="password">新密码</InputItem>
      )}
      {getFieldDecorator("check_password")(
        <InputItem type="password">确认密码</InputItem>
      )}
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </UserBox>
  );
};
