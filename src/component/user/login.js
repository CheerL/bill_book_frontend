import React from "react";
import { InputItem, Button } from "antd-mobile";
import useForm from "rc-form-hooks";
import { UserBox } from "./box";
import Context from '../../store'

export const Login = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { user } = Context.useStore()

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        if (form.username === 'cheer' && form.password === 'lcr0717') {
          user.loginFunc({
            id: '001',
            nickname: 'Cheer.L',
            username: form.username,
            avatar: 'default',
            jwt: 'aaa'
          })
        }
      })
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
  );
};
