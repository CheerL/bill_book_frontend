import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker, Picker } from "antd-mobile";

import Context from '../../../store'
import { useBillAction } from '../../../action'
import { Bar, BottomButton, Select } from "../../../common";
import { object_map } from '../../../common/object'

const ChangeBill = ({ match }) => {
  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();
  const { account_store, bill_store, current, billbook_store } = Context.useStore()
  const { change } = useBillAction()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  const account = account_store.getAccount(bill.account)
  const billbook = billbook_store.getBillbook(bill.billbook)

  current.bill = bill

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(change)
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      direction: bill.amount > 0 ? 'in' : 'out',
      account: [account.id],
      billbook: [billbook.id],
      cat_0: bill.cat_0,
      cat_1: bill.cat_1,
      payer: bill.payer,
      consumer: bill.consumer,
      remark: bill.remark,
      amount: Math.abs(bill.amount),
      time: bill.time_date,
    })
    // eslint-disable-next-line
  }, [])

  return Context.useConsumer(() => (
    <>
      <Bar title='修改账单' />
      <List className='padding-bottom'>
        {getFieldDecorator('direction')(
          <Select data={[{ value: 'out', label: '支出' }, { value: 'in', label: '收入' }]} />
        )}
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
            data={object_map(billbook_store.billbooks,
              billbook => ({ value: billbook.id, label: billbook.name })
            )}>
            <List.Item arrow="horizontal">所属账本</List.Item>
          </Picker>
        )}
        {getFieldDecorator('account')(
          <Picker
            cols={1}
            data={object_map(account_store.accounts,
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

export default ChangeBill