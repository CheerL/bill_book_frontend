import React, { useState } from 'react'
import { List, Grid, } from 'antd-mobile'
import { MyIcon as Icon } from '../../../common'
import Context from '../../../store'
// import { useRouter } from '../../../router'
import './cat_select.css'

const CatSelect = ({value, onChange, children, columnNum=4, isCarousel=false, carouselMaxRow=2}) => {
  if (!onChange) {
    onChange = newValue => {
      value = newValue
    }
  }

  // const router = useRouter()
  const { icon } = Context.useStore()
  const [visible, setVisible] = useState(false)
  const data = icon.icons
  const new_cat = [{ icon: 'add', text: '新建分类' }]
  const handleClick = () => {
    setVisible(!visible)
  }
  const itemClick = obj => {
    if (obj.text !== '新建分类') {
      onChange(obj.text)
    } else {
      console.log('新建')
      // router.history.push('/billbook/bill/cat/new')
    }
  }
  return Context.useConsumer(() => (
    <>
      <List.Item
        extra={value}
        arrow='horizontal'
        onClick={handleClick}
      >
        {children}
      </List.Item>
      {visible ?
        <Grid
          data={data.concat(new_cat).map(item => ({
            icon: <Icon type={item.icon} style={{
              fontSize: '32px'
            }} />,
            text: item.text
          }))}
          columnNum={columnNum}
          isCarousel={isCarousel}
          carouselMaxRow={carouselMaxRow}
          onClick={itemClick}
        /> :
        null
      }
    </>
  ))
}

export default CatSelect