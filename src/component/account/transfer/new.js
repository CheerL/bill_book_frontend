import React, { useEffect } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem, Picker, DatePicker } from "antd-mobile";

import Context from '../../../store'
import { Bar, Select, BottomButton, date, MoneyInput } from "../../../common";
import { object_map } from '../../../common/object'
import { useTransferAction } from '../../../action'

import AccountPopup from './popup'

const NewTransfer = () => {
  const store = Context.useStore()
  const { getFieldDecorator, validateFields, setFieldsValue, getFieldValue } = useForm();
  const { add } = useTransferAction()

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(add)
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
          <Select data={[{ value: false, label: '转出' }, { value: true, label: '转入' }]} />
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
        {getFieldDecorator('target')(
          <Picker
            data={object_map(store.accountsExceptCurrent,
              account => ({ value: account.id, label: account.name })
            ).concat([{ value: '', label: '外部' }])}
            cols={1}
          >
            <List.Item arrow="horizontal">{getFieldValue('direction') ? '付款账户' : '收款账户'}</List.Item>
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