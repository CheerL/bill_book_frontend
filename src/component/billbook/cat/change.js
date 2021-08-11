import React, { useEffect } from 'react'
import useForm from "rc-form-hooks";
import { List } from "antd-mobile";

import Context from '../../../store'
import { Bar, BottomButton, CatHead, UnmodifiedItem, colorSpan } from "../../../common";
import { useCatAction } from '../../../action'
import { useLink } from '../../../router'
import iconDict from '../../../common/icon/type'

import CatSelect from './select'

const ChangeCat = ({ match }) => {
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = useForm();
  const { change, remove } = useCatAction()
  const goBack = useLink()
  const { cat_store, billbook_store, current } = Context.useStore()
  const { text, billbook } = match.params
  const cat = cat_store.getCat(text, billbook)
  current.billbook = billbook_store.getBillbook(billbook)

  const data = Object.keys(iconDict).map(icon => ({
    icon: icon,
    text: icon
  }))

  const rightContent = [
    {
      value: 'delete', content: colorSpan('删除分类', 'red'), onSelect: () => {
        remove(undefined, cat)
        goBack()
      }
    }
  ]

  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        form.id = cat.id
        change(form)
      })
      .catch(console.log);
  };
  useEffect(() => {
    setFieldsValue({
      'icon': cat.icon,
      'id': cat.id
    })
    // eslint-disable-next-line
  }, [])

  return <>
    <Bar title='修改分类' rightContent={rightContent} />
    <CatHead
      text=''
      icon={getFieldValue('icon')}
      name={text}
    />
    <List className='padding-bottom'>
      <UnmodifiedItem extra={current.billbook.name} >账本</UnmodifiedItem>
      <UnmodifiedItem extra={text} >分类名称</UnmodifiedItem>
      {getFieldDecorator("icon")(<CatSelect data={data} isCarousel carouselMaxRow={4} noAdd>分类图标</CatSelect>)}
    </List>
    <BottomButton type="primary" onClick={handleSubmit}>
      修改
    </BottomButton>
  </>
};

export default ChangeCat