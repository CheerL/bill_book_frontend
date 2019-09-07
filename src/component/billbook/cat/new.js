import React from "react";
import useForm from "rc-form-hooks";
import { List, InputItem } from "antd-mobile";

import Context from '../../../store'
import { Bar, BottomButton, CatHead } from "../../../common";
import { useCatAction } from '../../../action'
import iconDict from '../../../common/icon/type'

import CatSelect from './select'

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
      <CatHead
        text=''
        icon={getFieldValue('icon')}
        name={getFieldValue('text')}
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