import React, { useState, useEffect, useMemo } from 'react'
import { useObserver } from 'mobx-react-lite'
import Context from '../../../store'
// import { StickyContainer, Sticky } from 'react-sticky'

import { Title, date, debounce } from '../../../common'
import { BillCard } from './card'
import { ListView, WhiteSpace } from 'antd-mobile'

import './listview.css'

const NUM_SECTIONS = 5;

const BillList = ({style}) => {
  const store = Context.useStore()
  const getSectionHeaderData = (dataBlob, sectionID) => dataBlob[sectionID];
  const getRowData = (dataBlob, _, rowID) => dataBlob[rowID];
  const [data, setData] = useState(new ListView.DataSource({
    getRowData,
    getSectionHeaderData,
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
  }))
  const [isLoading, setIsLoading] = useState(true)
  const [dataBlobs, setDataBlobs] = useState({ page: 0 });
  const [sectionIDs, setSectionIDs] = useState([]);
  const [rowIDs, setRowIDs] = useState([]);


  const onEndReached = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true)
    genData();
  }
  const genData = (init = false) => {
    const _sectionIDs = init ? [] : [...sectionIDs]
    const _rowIDs = init ? [] : [...rowIDs]
    const _dataBlobs = init ? { page: 0 } : { ...dataBlobs }

    let sectionNum
    const page = _dataBlobs.page
    const bills = store.billsGroupbyDay
    const days = Object.keys(bills).map(Number).sort((a, b) => b - a)

    for (sectionNum = page; sectionNum < page + NUM_SECTIONS && sectionNum < days.length; sectionNum++) {
      const sectionID = days[sectionNum]
      _sectionIDs.push(sectionID);
      _dataBlobs[sectionID] = 0;
      _rowIDs[sectionNum] = [];

      // eslint-disable-next-line
      bills[sectionID].forEach(bill => {
        _rowIDs[sectionNum].push(bill.id)
        _dataBlobs[sectionID] = bill.amount.add(_dataBlobs[sectionID])
        _dataBlobs[bill.id] = bill
      });
    }

    _dataBlobs.page = sectionNum
    setDataBlobs(_dataBlobs)
    setRowIDs(_rowIDs)
    setSectionIDs(_sectionIDs)
    setIsLoading(false)
  }
  const genDataDebounce = useMemo((init = false) => {
    return debounce(() => {
      genData(init)
    }, 100)
    // eslint-disable-next-line
  }, [])

  const sectionHeader = (dayMoney, day) => {
    // const dayBillIds =
    return (
      // <Sticky>
      //   {({ style }) => (
      //     <div style={style}>
            <Title title={<>
              <span>{date.num2str(day)}</span>
              <span style={{ float: 'right', color: 'dimgray' }}>日消费:&nbsp;
              <span style={{ color: 'black', fontWeight: 'bold' }}>
                  {dayMoney ? dayMoney.toString() : ''}
                </span>
              </span>
            </>} />
      //       </div>
      //   )}
      // </Sticky>
    )
  };
  // const sectionWrapper = sectionID => (
  //   <StickyContainer key={`sw_${sectionID}_c`} />
  // )
  const row = (_, __, billId) => {
    const bill = store.bill_store.getBill(billId)
    return <BillCard bill={bill} key={billId} />;
  };
  const separator = (sectionID, rowID) => <WhiteSpace sizs='sm' key={sectionID + rowID} />

  useEffect(() => {
    setIsLoading(true)
    genDataDebounce(true)
    // eslint-disable-next-line
  }, [store.bill_store.billNum])

  useEffect(() => {
    setIsLoading(true)
    genData(true)
    // eslint-disable-next-line
  }, [store.current.billbook])

  useEffect(() => {
    if (rowIDs.length === sectionIDs.length) {
      setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs))
    }
    // eslint-disable-next-line
  }, [rowIDs, sectionIDs])

  useObserver(() => store.bill_store.billNum)

  return Context.useConsumer(() => (
    <ListView
      dataSource={data}
      initialListSize={100}
      renderSectionHeader={sectionHeader}
      // renderSectionWrapper={sectionWrapper}
      renderRow={row}
      renderSeparator={separator}
      style={style}
      pageSize={5}
      scrollRenderAheadDistance={500}
      onEndReached={onEndReached}
      onEndReachedThreshold={100}
      scrollEventThrottle={200}
      renderBodyComponent={() => <div className='list-view-wrapper' />}
    />
  ))
}

export default BillList