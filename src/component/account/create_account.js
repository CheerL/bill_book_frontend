import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, Button } from "antd-mobile";
import { Bar } from "../../common/navbar";
import { useRouter } from '../../common/router'
import Context from '../../store'

export const CreateAccount = () => {
  const router = useRouter()
  const { accountList } = Context.useStore()
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(account => {
        account.id = Math.random().toString().substring(2, 15)
        accountList.addAccount(account)
        router.history.goBack()
      })
      .catch(console.log);
  };

  return (
    <>
      <Bar title='新建账户'/>
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
          <InputItem type="money" placeholder="0.0" moneyKeyboardAlign="left">
            余额
          </InputItem>
        )}
        <Button type="primary" onClick={handleSubmit}>
          新建
        </Button>
      </List>
    </>
  );
};
