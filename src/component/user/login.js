import React, { useEffect, useState } from "react";
import { InputItem, Button } from "antd-mobile";
import useForm from "rc-form-hooks";
import { UserBox } from "./box";
import Context from '../../store'
import api from '../../action/api'

export const Login = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { user } = Context.useStore()
  const [isRender, setIsRender] = useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        api.user.login(form.username, form.password)
          .then(res => {
            user.loginFunc(res)
          })
          .catch(console.log)
      })
      .catch(console.log);
  };
  const links = [
    { path: "forget", text: "忘记密码" },
    { path: "register", text: "注册账号" }
  ];
  const title = "登录账号";

  useEffect(() => {
    api.user.login_jwt()
    .then(res => user.loginFunc(res))
    .catch(() => setIsRender(true))
    // eslint-disable-next-line
  }, [])

  return isRender ?
    <UserBox links={links} title={title}>
      {getFieldDecorator("username")(<InputItem type="text">账号</InputItem>)}
      {getFieldDecorator("password")(
        <InputItem type="password">密码</InputItem>
      )}
      <Button type="primary" onClick={handleSubmit}>
        登录
      </Button>
    </UserBox>:
    <></>
};
