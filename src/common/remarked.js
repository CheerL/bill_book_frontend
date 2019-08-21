import React from 'react'
import './remarked.css'

const Remarked = ({ text, remark, position = 'left', onClick }) => (
  <div
    className="remarked-text"
    style={{ textAlign: position }}
    onClick={onClick}
  >
    <div>{text}</div>
    <div className="remarked-remark">{remark}</div>
  </div>
)

export default Remarked