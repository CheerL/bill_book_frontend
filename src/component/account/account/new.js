import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import Context from '../../../store'
import { useLink } from '../../../router'
import { Bar, BottomButton } from "../../../common";

const NewAccount = () => {
  const goBack = useLink()
  const { account_store } = Context.useStore()
  const { getFieldDecorator, validateFields } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        form.id = Math.random().toString().substring(3, 6)
        form.amount = form.amount === undefined ? 0 : Number(form.amount)
        account_store.addAccount(form)
        goBack()
      })
      .catch(console.log);
  };

  return (
    <>
      <Bar title='新建账户' />
      <List className='padding-bottom'>
        {getFieldDecorator("name")(
          <InputItem type="text" placeholder="账户名称">
            账户名称
          </InputItem>
        )}
        {getFieldDecorator("amount")(
          <InputItem type="money" placeholder="0" moneyKeyboardAlign="right">
            余额
          </InputItem>
        )}
        {getFieldDecorator("remark")(
          <InputItem type="text" placeholder="备注">
            备注
          </InputItem>
        )}

      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        新建
      </BottomButton>
    </>
  );
};

export default NewAccount