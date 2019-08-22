import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";
import { Bar, BottomButton, UnmodifiedItem } from "../../common";
import { useLink } from '../../router'
import Context from '../../store'

export const ChangeAccount = ({ match }) => {
  const goBack = useLink()
  const { account_store, current } = Context.useStore()
  const id = match.params.id
  const account = account_store.getAccount(id)
  current.account = account

  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        if (form.name) {
          account.name = form.name
          account.remark = form.remark
        }
        goBack()
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      name: account.name,
      remark: account.remark,
      amount: String(account.amount)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Bar title='修改账户' />
      <List className='padding-bottom'>
        {getFieldDecorator("name")(
          <InputItem type="text" placeholder="账户名称">
            账户名称
          </InputItem>
        )}
        <UnmodifiedItem extra={account.amount} text='账户余额' />
        {getFieldDecorator("remark")(
          <InputItem type="text" placeholder="备注">
            备注
          </InputItem>
        )}
        
      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        修改
      </BottomButton>
    </>
  );
};
