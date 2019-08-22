import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker, Picker } from "antd-mobile";

import Context from '../../../store'
import { useLink } from '../../../router'
import { Bar, BottomButton, date } from "../../../common";

const NewBill = () => {
  const goBack = useLink()
  const { account_store, bill_store, current, billbook_store, user } = Context.useStore()
  if (current.billbook === undefined) {
      current.billbook = billbook_store.defaultBillbook
  }

  const billbook = current.billbook
  const account = account_store.defaultAccount
  const username = user.nickname
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        form.id = Math.random().toString().substring(3, 6)
        form.time = date.date2num(form.time)
        form.amount = form.amount ? Number(form.amount) : 0
        form.creater = username
        form.billbook = form.billbook[0]
        form.account = form.account[0]
        bill_store.addBill(form)
        goBack()
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      account: [account.id],
      billbook: [billbook.id],
      payer: username,
      consumer: username,
      time: date.now_date(),
    })
    // eslint-disable-next-line
  }, [])

  return Context.useConsumer(() => (
    <>
      <Bar title='新建账单' />
      <List className='padding-bottom'>
        {getFieldDecorator('time')(
          <DatePicker mode='date' title='选择日期' >
            <List.Item arrow="horizontal">时间</List.Item>
          </DatePicker>
        )}
        {getFieldDecorator("amount")(
          <InputItem type="money" placeholder="0" moneyKeyboardAlign="right">
            金额
          </InputItem>
        )}
        {getFieldDecorator("cat_0")(
          <InputItem type="text" placeholder="类别">
            类别
          </InputItem>
        )}
        {getFieldDecorator("cat_1")(
          <InputItem type="text" placeholder="子类别">
            子类别
          </InputItem>
        )}

        {getFieldDecorator("payer")(
          <InputItem type="text" placeholder="付款者" defaultValue=''>
            付款者
          </InputItem>
        )}
        {getFieldDecorator("consumer")(
          <InputItem type="text" placeholder="消费者" defaultValue=''>
            消费者
          </InputItem>
        )}
        {getFieldDecorator('billbook')(
          <Picker
            cols={1}
            data={billbook_store.billbooks.map(
              billbook => ({ value: billbook.id, label: billbook.name })
            )}>
            <List.Item arrow="horizontal">所属账本</List.Item>
          </Picker>
        )}
        {getFieldDecorator('account')(
          <Picker
            cols={1}
            data={account_store.accounts.map(
              account => ({ value: account.id, label: account.name })
            )}>
            <List.Item arrow="horizontal">所属账户</List.Item>
          </Picker>
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
  ));
};

export default NewBill