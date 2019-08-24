import React from "react";
import { InputItem, Button } from "antd-mobile";
import useForm from "rc-form-hooks";
import { UserBox } from "./box";
import { useLink } from '../../router'
import api from '../../action/api'

export const Forget = () => {
  const goBack = useLink()
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        if (form.password === form.check_password) {
          api.user.forget(form.username, form.password)
          .then(res => {
            // console.log(res)
            goBack()
          })
          .catch(console.log)
        }
      })
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
