import React, { useState, useEffect } from 'react'
import Context from '../../../store'

import { Title, date } from '../../../common'
import { BillCard } from './card'
import { ListView, WhiteSpace } from 'antd-mobile'

import './listview.css'

const NUM_SECTIONS = 5;

const BillList = () => {
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

  const [page, setPage] = useState(0);
  const [dataBlobs, setDataBlobs] = useState({});
  const [sectionIDs, setSectionIDs] = useState([]);
  const [rowIDs, setRowIDs] = useState([]);

  const initBlobs = () => {
    setPage(0)
    setSectionIDs([])
    setRowIDs([])
    // setDataBlobs({})
  }

  const genData = () => {
    const bills = store.billsGroupbyDay
    const days = Object.keys(bills).map(Number).sort((a, b) => b - a)
    let i
    for (i = 0; i < NUM_SECTIONS; i++) {
      const sectionNum = page + i
      if (sectionNum >= days.length) {
        break
      }
      const sectionID = days[sectionNum]
      sectionIDs.push(sectionID);
      dataBlobs[sectionID] = 0;
      rowIDs[sectionNum] = [];

      bills[sectionID].forEach(bill => {
        const rowID = bill.id
        rowIDs[sectionNum].push(rowID)
        dataBlobs[sectionID] = bill.amount.add(dataBlobs[sectionID])
        dataBlobs[rowID] = bill
      });
    }
    console.log(sectionIDs, rowIDs, page, i)
    setPage(page + i)
  }

  useEffect(() => {
    genData();
    setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    initBlobs()
    genData()
    setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs))
  }, [store.current.billbook])


  window.dd = data
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  const onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (isLoading) {
      return;
    }
    // setIsLoading(true)
    // setTimeout(() => {
    genData();
    setData(data.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs))
    // setIsLoading(false)
    // }, 1000);
  }


  const sectionHeader = (sectionData, sectionID) => {
    return <Title title={<>
      <span>{date.num2str(sectionID)}</span>
      <span style={{ float: 'right', color: 'dimgray' }}>日消费:&nbsp;
        <span style={{ color: 'black', fontWeight: 'bold' }}>{sectionData.toString()}</span>
      </span>
    </>} />
  };
  const row = (bill, sectionID, rowID) => {
    console.log(bill, sectionID, rowID)
    return (<BillCard bill={bill} key={rowID} />);
  };
  const separator = (sectionID, rowID) => <WhiteSpace sizs='sm' key={sectionID + rowID} />

  return Context.useConsumer(() => (
    <ListView
      dataSource={data}
      initialListSize={100}
      renderSectionHeader={sectionHeader}
      renderRow={row}
      renderSeparator={separator}
      style={{
        height: document.documentElement.clientHeight - 100,
        overflow: 'auto',
      }}
      pageSize={5}
      scrollRenderAheadDistance={500}
      onEndReached={onEndReached}
      onEndReachedThreshold={100}
      scrollEventThrottle={200}
      contentContainerStyle={{
        backgroundColor: 'red'
      }}
      renderBodyComponent={() => <div className='list-view-wrapper' />}
    />
  ))
}

export default BillList