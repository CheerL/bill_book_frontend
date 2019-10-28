import React, { useState, useEffect } from 'react'
import { Grid, List, Modal } from 'antd-mobile'
import { MyIcon as Icon, useLongPress, colorSpan } from '../../../common'
import Context from '../../../store'
import { useRouter } from '../../../router'
import { useCatAction } from '../../../action'
import './select.css'

const CatGridItem = ({ data, onLongPress = () => () => { } }) => {
  const longPress = useLongPress(onLongPress(data))
  return (
    <div className='cat-grid-box' {...longPress}>
      {data.icon}
      <div style={{ fontSize: '14px', marginTop: '4px' }}>
        {data.text}
      </div>
    </div>
  )

}

const CatSelect = ({ value, onChange, children, data, onLongPress, noAdd = false, columnNum = 4, isCarousel = false, carouselMaxRow = 2 }) => {
  const router = useRouter()
  const { cat_store, current } = Context.useStore()
  const { remove } = useCatAction()
  const [visible, setVisible] = useState(false)
  const billbook = current.billbook.id

  if (!onChange) {
    onChange = newValue => {
      value = newValue
    }
  }
  if (!onLongPress) {
    onLongPress = dataItem => () => Modal.operation([
      {
        text: '修改分类', onPress: () => {
          router.push(
            `/billbook/cat/change/${billbook}/${dataItem.text}`
          )
        }
      },
      {
        text: colorSpan('删除分类', 'red'), onPress: () => {
          const cat = cat_store.getCat(dataItem.text, billbook)
          remove(undefined, cat)
        }
      }
    ])
  }

  const new_cat = noAdd ? [] : [{ icon: 'add', text: '新建分类' }]
  const itemClick = obj => {
    if (obj.text !== '新建分类') {
      onChange(obj.text)
    } else {
      router.push('/billbook/cat/new')
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

  return <>
    <List.Item
      arrow='horizontal'
      onClick={() => setVisible(!visible)}
      extra={value}
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
        renderItem={dataItem => <CatGridItem data={dataItem} onLongPress={onLongPress} />}
      /> :
      null
    }
  </>
}

export default CatSelect