import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import Context from '../../../store'
import { useLink } from '../../../router'
import { Bar, BottomButton, DetailHead } from "../../../common";
import iconDict from '../../../common/icon/type'

import CatSelect from './cat_select'

const NewCat = () => {
  const goBack = useLink()
  const { cat_store } = Context.useStore()
  const { getFieldDecorator, validateFields, getFieldValue } = useForm();
  const data = Object.keys(iconDict).map(icon => ({
    icon: icon,
    text: icon
  }))
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(form => {
        cat_store.addCat(form)
        goBack()
      })
      .catch(console.log);
  };

  return Context.useConsumer(() => (
    <>
      <Bar title='新建分类' />
      <DetailHead
        text=''
        icon={getFieldValue('icon')}
        amount={getFieldValue('text')}
      />
      <List className='padding-bottom'>
        {getFieldDecorator("text")(<InputItem type="text" placeholder="分类名称">分类名称</InputItem>)}
        {getFieldDecorator("icon")(<CatSelect data={data} isCarousel carouselMaxRow={4} noAdd>分类图标</CatSelect>)}
      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        新建
      </BottomButton>
    </>
  ));
};

export default NewCat