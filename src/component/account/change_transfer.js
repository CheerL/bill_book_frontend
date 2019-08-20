import React, { useEffect, useState } from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";
import { Bar, useLink, Select, BottomButton, UnmodifiedItem } from "../../common";
import Context from '../../store'

export const ChangeTransfer = ({ match }) => {
  const goBack = useLink()
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
          bill.payer = consumer.id
          bill.consumer = payer.id
        }

        bill.remark = form.remark
        bill.amount = form.amount ? Number(form.amount) : 0
        goBack()
      })
      .catch(console.log);
  };

  useEffect(() => {
    setFieldsValue({
      remark: bill.remark,
      amount: bill.amount
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
      <List>
        <Select data={[
          { value: 'change', label: '转换流向', onClick: changeClick }
        ]} />
        <UnmodifiedItem extra={changed ? consumer.name : payer.name} text='转出账户' />
        <UnmodifiedItem extra={changed ? payer.name : consumer.name} text='转入账户' />
        {getFieldDecorator("remark")(
          <InputItem type="text" placeholder="备注" defaultValue=''>
            备注
          </InputItem>
        )}
        {getFieldDecorator("amount")(
          <InputItem type="money" placeholder="0" moneyKeyboardAlign="left">
            金额
          </InputItem>
        )}
      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        修改
      </BottomButton>
    </>
  ));
};
