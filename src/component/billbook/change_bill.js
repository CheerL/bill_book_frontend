import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker, Picker } from "antd-mobile";
import { Bar, BottomButton } from "../../common";
// import { useLink } from '../../router'
import Context from '../../store'

export const ChangeBill = ({ match }) => {
  // const goBack = useLink()
  const { account_store, bill_store, current, billbook_store } = Context.useStore()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  current.bill = bill
  const account = account_store.getAccount(bill.account)
  const billbook = billbook_store.getBillbook(bill.billbook)

  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        // if (changed) {
        //   bill.payer = consumer.id
        //   bill.consumer = payer.id
        // }

        // bill.remark = form.remark
        // bill.amount = form.amount ? Number(form.amount) : 0
        // bill.time = Date.parse(form.time)
        // goBack()
        console.log(form)
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      account: [account.id],
      billbook: [billbook.id],
      cat_0: bill.cat_0,
      cat_1: bill.cat_1,
      payer: bill.payer,
      consumer: bill.consumer,
      remark: bill.remark,
      amount: bill.amount,
      time: bill.time_date,
    })
    // eslint-disable-next-line
  }, [])

  return Context.useConsumer(() => (
    <>
      <Bar title='修改账单' />
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
        修改
      </BottomButton>
    </>
  ));
};
