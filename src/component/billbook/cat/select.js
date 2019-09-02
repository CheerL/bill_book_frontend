import React, { useState, useEffect } from 'react'
import { Grid, List } from 'antd-mobile'
import { MyIcon as Icon } from '../../../common'
import Context from '../../../store'
import { useRouter } from '../../../router'
import './select.css'

const CatSelect = ({ value, onChange, children, data, noAdd = false, columnNum = 4, isCarousel = false, carouselMaxRow = 2 }) => {
  if (!onChange) {
    onChange = newValue => {
      value = newValue
    }
  }
  const router = useRouter()
  const { cat_store, current } = Context.useStore()
  const [visible, setVisible] = useState(false)
  const catData = data === undefined ? cat_store.filterByBillbook(current.billbook) : data
  const new_cat = noAdd ? [] : [{ icon: 'add', text: '新建分类' }]
  const itemClick = obj => {
    if (obj.text !== '新建分类') {
      onChange(obj.text)
    } else {
      router.history.push('/billbook/bill/cat/new')
    }
  }

  useEffect(() => {
    return () => {
      if (window.catSelectBlurTimeout) {
        clearTimeout(window.catSelectBlurTimeout)
        window.catSelectBlurTimeout = undefined
      }
    }
  })

  return Context.useConsumer(() => (
    <>
      <List.Item
        // value={value}
        arrow='horizontal'
        onClick={() => setVisible(!visible)}
        // extra={<div className="am-list-arrow am-list-arrow-horizontal" aria-hidden="true" />}
        extra={value}
      >
        {children}
      </List.Item>
      {visible ?
        <Grid
          data={catData.concat(new_cat).map(item => ({
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