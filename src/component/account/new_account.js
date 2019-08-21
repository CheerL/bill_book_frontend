import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";
import { Bar, BottomButton } from "../../common";
import { useLink } from '../../router'
import Context from '../../store'

export const NewAccount = () => {
  const goBack = useLink()
  const { account_store } = Context.useStore()
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        form.id = Math.random().toString().substring(2, 15)
        form.amount = form.amount === undefined ? 0 : Number(form.amount)
        account_store.addAccount(form)
        goBack()
      })
      .catch(console.log);
  };

  return (
    <>
      <Bar title='新建账户' />
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
          <InputItem type="money" placeholder="0" moneyKeyboardAlign="left">
            余额
          </InputItem>
        )}
      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        新建
      </BottomButton>
    </>
  );
};
