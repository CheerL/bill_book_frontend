import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, Picker, DatePicker } from "antd-mobile";

import Context from '../../../store'
import { useLink } from '../../../router'
import { Bar, Select, BottomButton, date } from "../../../common";

import AccountPopup from './popup'

const NewTransfer = () => {
  const goBack = useLink()
  const store = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = useForm();
  window.store = store

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        form.id = Math.random().toString().substring(3, 6)
        form.billbook = 'transfer'
        form.creater = store.user.nickname
        form.amount = form.amount ? Number(form.amount) : 0

        if (form.direction === 'in') {
          form.consumer = store.current.account.id
          form.payer = form.target[0]
        } else if (form.direction === 'out') {
          form.payer = store.current.account.id
          form.consumer = form.target[0]
        }

        if (form.remark === undefined) {
          form.remark = ''
        }
        form.time = date.date2num(form.time)
        store.bill_store.addBill(form)
        goBack()
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      time: date.now_date(),
    })
    // eslint-disable-next-line
  }, [])


  return Context.useConsumer(() => (
    <>
      <Bar title={store.current.account !== undefined ? `发起转账（${store.current.account.name})` : '发起转账'} />
      <AccountPopup />
      <List className='padding-bottom'>
        {getFieldDecorator('direction')(
          <Select data={[{ value: 'out', label: '转出' }, { value: 'in', label: '转入' }]} />
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
        {getFieldDecorator('target')(
          <Picker
            data={store.accountsExceptCurrent.map(
              account => ({ value: account.id, label: account.name })
            ).concat([{ value: '', label: '外部' }])}
            cols={1}
          >
            <List.Item arrow="horizontal">{getFieldValue('direction') === 'out' ? '收款账户' : '付款账户'}</List.Item>
          </Picker>
        )}
        {getFieldDecorator("remark")(
          <InputItem type="text" placeholder="备注" defaultValue=''>
            备注
          </InputItem>
        )}

      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        转账
      </BottomButton>
    </>
  ));
};

export default NewTransfer