import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem,Switch } from "antd-mobile";
import { Bar, BottomButton, UnmodifiedItem, unModifiedColor, colorSpan } from "../../common";
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
        account.name = form.name
        account.remark = form.remark
        if (!account.default && form.default) {
          account_store.defaultAccount.default = false
          account.default = true
        }
        goBack()
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      name: account.name,
      remark: account.remark,
      amount: String(account.amount),
      default: account.default
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
        <List.Item extra={getFieldDecorator('default', { valuePropName: 'checked' })(
          <Switch disabled={account.default} />
        )}>
          {colorSpan('默认账户', account.default ? unModifiedColor : 'black')}
        </List.Item>
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
