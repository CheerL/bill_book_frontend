import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import { Bar, BottomButton } from "../../../common";
import { useAccountAction } from '../../../action'

const NewAccount = () => {
  const { getFieldDecorator, validateFields } = useForm();
  const { add } = useAccountAction()
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(add)
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