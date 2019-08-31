import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import Context from '../../../store'
import { Bar, BottomButton, DetailHead } from "../../../common";
import { useCatAction } from '../../../action'
import iconDict from '../../../common/icon/type'

import CatSelect from './cat_select'

const NewCat = () => {
  const { getFieldDecorator, validateFields, getFieldValue } = useForm();
  const { add } = useCatAction()
  const data = Object.keys(iconDict).map(icon => ({
    icon: icon,
    text: icon
  }))
  const handleSubmit = e => {
    e.preventDefault();
    validateFields()
      .then(add)
      .catch(console.log);
  };

  return Context.useConsumer(() => (
    <>
      <Bar title='新建分类' />
      <DetailHead
        text=''
        icon={getFieldValue('icon')}
        amount={getFieldValue('name')}
      />
      <List className='padding-bottom'>
        {getFieldDecorator("name")(<InputItem type="text" placeholder="分类名称">分类名称</InputItem>)}
        {getFieldDecorator("icon")(<CatSelect data={data} isCarousel carouselMaxRow={4} noAdd>分类图标</CatSelect>)}
      </List>
      <BottomButton type="primary" onClick={handleSubmit}>
        新建
      </BottomButton>
    </>
  ));
};

export default NewCat