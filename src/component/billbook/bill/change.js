import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker, Picker } from "antd-mobile";

import Context from '../../../store'
import { useBillAction } from '../../../action'
import { Bar, BottomButton, Select, MoneyInput, DetailHead } from "../../../common";
import { object_map } from '../../../common/object'

import CatSelect from '../cat/select'

const ChangeBill = ({ match }) => {
  const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = useForm();
  const { account_store, bill_store, current, billbook_store, cat_store } = Context.useStore()
  const { change } = useBillAction()
  const id = match.params.id
  const bill = bill_store.getBill(id)
  const account = account_store.getAccount(bill.account)
  const billbook = billbook_store.getBillbook(bill.billbook)

  current.bill = bill
  current.billbook = billbook

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(change)
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      direction: bill.amount > 0 ? true : false,
      account: [account.id],
      billbook: [billbook.id],
      cat_0: bill.cat_0,
      cat_1: bill.cat_1,
      payer: bill.payer,
      consumer: bill.consumer,
      remark: bill.remark,
      amount: String(Math.abs(bill.amount)),
      time: bill.time_date,
    })
    // eslint-disable-next-line
  }, [])

  return Context.useConsumer(() => (
    <>
      <Bar title='修改账单' />
      {cat_store.getCat(getFieldValue('cat_0'), billbook.id) ?
        <DetailHead
          text={cat_store.getCat(getFieldValue('cat_0'), billbook.id).text}
          icon={cat_store.getCat(getFieldValue('cat_0'), billbook.id).icon}
          amount={`${!getFieldValue('direction') && getFieldValue('amount') !== '0' ? '-' : ''}${getFieldValue('amount')}`}
        /> :
        null
      }
      <List className='padding-bottom'>
        {getFieldDecorator('direction')(
          <Select data={[{ value: false, label: '支出' }, { value: true, label: '收入' }]} />
        )}
        {getFieldDecorator('time')(
          <DatePicker mode='date' title='选择日期' >
            <List.Item arrow="horizontal">时间</List.Item>
          </DatePicker>
        )}
        {getFieldDecorator("amount")(
          <MoneyInput>
            金额
          </MoneyInput>
        )}
        {getFieldDecorator("cat_0")(
          <CatSelect isCarousel data={cat_store.filterByBillbook(billbook.id)}>类别</CatSelect>
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