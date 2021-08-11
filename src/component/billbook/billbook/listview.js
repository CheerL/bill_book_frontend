import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useObserver } from 'mobx-react-lite'
import Context from '../../../store'
import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as VList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
// import { StickyContainer, Sticky } from 'react-sticky'

import { Title, date, debounce, isString } from '../../../common'
import { BillCard } from './card'
import { WhiteSpace } from 'antd-mobile'
import ReactLoading from "react-loading";

import './listview.css'

const Loading = React.memo(() => <div className='loading'>
  <ReactLoading type='spin' height={24} width={24} color='#108ee9' />
</div>
)

const DayHeader = React.memo(({ spending, day }) => {
  return <Title
    title={<>
      <span>{date.num2str(day)}</span>
      <span style={{ float: 'right', color: 'dimgray' }}>
        日消费:&nbsp;
        <span style={{ color: 'black', fontWeight: 'bold' }}>
          {spending ? spending.toString() : ''}
        </span>
      </span>
    </>}
  />
})

const BillRow = React.memo(({ bill, billkey }) => {
  return <div className='billcard'>
    <BillCard bill={bill} key={billkey} />
    <WhiteSpace sizs='sm' key={`${billkey}ws`} />
  </div>
})

const Row = React.memo(({ itemData, itemKey, style }) => {
  return <div style={style} className='row'>{
    itemData ?
      (!isString(itemKey) ?
        <DayHeader spending={itemData.spending} day={itemKey} style={style} /> :
        <BillRow style={style} bill={itemData} billkey={itemKey} />) :
      <Loading style={style} />}
  </div>
})

const LOAD_DAYS_NUM = 5

const BillList = () => {
  const store = Context.useStore()

  const listRef = useRef(null)
  const [itemLoading, _setItemLoading] = useState({ loading: false, init: false })
  const [isAllLoaded, setIsAllLoaded] = useState(false)
  const [data, setData] = useState({ loadedDay: 0 });
  const [rowList, setRowList] = useState([]);

  const itemCount = !isAllLoaded ? (rowList.length + 1) : rowList.length
  const getItemSize = index => !isString(rowList[index]) ? (index === 0 ? 47 : 38) : 67
  const isItemLoaded = index => isAllLoaded || index < rowList.length
  const loadMoreItems = !itemLoading.isLoading ? () => {
    return new Promise(() => {
      setItemLoading(false)
    })
  } : () => { }

  const resetAfterIndex = (index = 0) => {
    if (listRef.current && listRef.current._listRef) {
      listRef.current._listRef.resetAfterIndex(index)
    }
  }

  const setItemLoading = (init = false) => {
    if (!itemLoading.loading) {
      _setItemLoading({
        loading: true,
        init: init
      })
    }
  }

  const loadData = (init = false) => {
    const _rowList = init ? [] : [...rowList]
    const _data = init ? { loadedDay: 0 } : { ...data }
    const bills = store.billsGroupbyDay
    const sortedDays = Object.keys(bills).map(Number).sort((a, b) => b - a)

    let _loadedDay
    for (_loadedDay = _data.loadedDay; _loadedDay < _data.loadedDay + LOAD_DAYS_NUM && _loadedDay < sortedDays.length; _loadedDay++) {
      const day = sortedDays[_loadedDay]
      _rowList.push(day)

      let spending = 0
      bills[day].forEach(bill => {
        _data[bill.id] = bill
        _rowList.push(bill.id)
        spending = bill.amount.add(spending)
      });

      _data[day] = { day: day, spending: spending, num: bills[day].length };
    }

    _data.loadedDay = _loadedDay

    if (_rowList.length === rowList.length && !isAllLoaded) {
      setIsAllLoaded(true)
    } else if (isAllLoaded && init && _rowList.length !== rowList.length) {
      setIsAllLoaded(false)
    }
    setData(_data)
    setRowList(_rowList)
    _setItemLoading({
      loading: false,
      init: false
    })
  }

  const rowRenderer = useCallback(({ index, style }) => {
    const itemKey = index < rowList.length ? rowList[index] : null
    const itemData = (itemKey !== null && data) ? data[itemKey] : null
    return <Row itemData={itemData} itemKey={itemKey} style={style} />
  }, [rowList, data])

  useEffect(() => {
    if (!store.current.loading.bill) {
      setItemLoading(true)
    }
  }, [store.bill_store.billNum])

  useEffect(() => {
    if (itemLoading.loading && store.current.billbook) {
      loadData(itemLoading.init)
    }
    if (itemLoading.init && !store.current.loading.bill) {
      resetAfterIndex(0)
    }
  }, [itemLoading])

  useEffect(() => {
    if (store.current.billbook) {
      setItemLoading(true)
    }
  }, [store.current.billbook])

  useObserver(() => store.bill_store.billNum)

  return Context.useConsumer(() => (<div style={{ height: document.documentElement.clientHeight - 100 }}>
    <AutoSizer>
      {({ height, width }) => (<InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
        ref={listRef}
      >
        {({ onItemsRendered, ref }) => (
          <VList
            height={height}
            width={width}
            itemCount={itemCount}
            itemSize={getItemSize}
            className='rVList'
            onItemsRendered={onItemsRendered}
            ref={ref}
            overscanCount={0}
          >
            {rowRenderer}
          </VList>
        )}
      </InfiniteLoader>
      )}</AutoSizer>
  </div>))
}

// export default BillList
export { BillList }