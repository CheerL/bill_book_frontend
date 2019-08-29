import React, { useEffect, useState } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker } from "antd-mobile";

import Context from '../../../store'
import { Bar, Select, BottomButton, UnmodifiedItem } from "../../../common";
import { useTransferAction } from '../../../action'

const ChangeTransfer = ({ match }) => {
  const { change } =  useTransferAction()
  const { account_store, bill_store, current } = Context.useStore()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  const payer = account_store.getAccount(bill.payer)
  const consumer = account_store.getAccount(bill.consumer)
  current.bill = bill

  const { getFieldDecorator, validateFields, setFieldsValue } = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        if (changed) {
          form.payer = consumer.id
          form.consumer = payer.id
        }
        change(form)
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      remark: bill.remark,
      amount: bill.amount,
      time: bill.time_date,
    })
    // eslint-disable-next-line
  }, [])

  const [changed, setChanged] = useState(false)
  const changeClick = () => {
    setChanged(!changed)
  }

  return Context.useConsumer(() => (
    <>
      <Bar title='修改转账' />
      <List className='padding-bottom'>
        <Select data={[
          { value: 'change', label: '转换流向', onClick: changeClick }
        ]} />
        <UnmodifiedItem extra={changed ? consumer.name : payer.name} text='转出账户' arrow='horizontal' />
        <UnmodifiedItem extra={changed ? payer.name : consumer.name} text='转入账户' arrow='horizontal' />
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

        {getFieldDecorator("remark")(
          <InputItem type="text" placeholder="备注" defaultValue=''>
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

export default ChangeTransfer