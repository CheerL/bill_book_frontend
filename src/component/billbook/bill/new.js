import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, DatePicker, Picker } from "antd-mobile";

import Context from '../../../store'
import { Bar, BottomButton, date, Select, DetailHead, MoneyInput } from "../../../common";
import { object_map } from '../../../common/object'
import { useBillAction } from '../../../action'

import CatSelect from './cat_select'

const NewBill = () => {
  const { account_store, current, billbook_store, user, cat_store } = Context.useStore()
  if (current.billbook === undefined) {
    current.billbook = billbook_store.defaultBillbook
  }
  const { add } = useBillAction()
  const billbook = current.billbook
  const account = account_store.defaultAccount
  const username = user.nickname
  const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = useForm();

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(add)
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      amount: '0',
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
      {cat_store.getCat(getFieldValue('cat_0')) ?
        <DetailHead
          text={cat_store.getCat(getFieldValue('cat_0')).text}
          icon={cat_store.getCat(getFieldValue('cat_0')).icon}
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
          <MoneyInput>金额</MoneyInput>
        )}
        {getFieldDecorator("cat_0")(
          <CatSelect isCarousel>类别</CatSelect>
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
            data={object_map(
              billbook_store.billbooks,
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
        新建
      </BottomButton>
    </>
  ));
};

export default NewBill