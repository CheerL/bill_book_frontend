import { Button, InputItem } from "antd-mobile";
import React from "react";
import useForm from "rc-form-hooks";
import "../index.css";
import { UserBox } from "../common";

export const Register = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields().then(console.log);
  };
  const links = [{ path: "login", text: "返回登录" }];

  return (
    <UserBox links={links}>
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
