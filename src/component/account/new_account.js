import React from "react";
import { List, InputItem, Button } from "antd-mobile";
import useForm from "rc-form-hooks";

export const CreateAccount = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault()
    validateFields()
      .then(console.log)
      .catch(console.log);
  }

  return (
    <List>
      {getFieldDecorator("name")(
        <InputItem type="text" placeholder="账户名称">
          账户名称
        </InputItem>
      )}
      {getFieldDecorator("remark")(
        <InputItem type="text" placeholder="备注">
          备注
        </InputItem>
      )}
      {getFieldDecorator("amount")(
        <InputItem type="money" placeholder="0.0" moneyKeyboardAlign='left'>
          余额
        </InputItem>
      )}
      <Button type='primary' onClick={handleSubmit}>
        新建
      </Button>
    </List>
  );
};
