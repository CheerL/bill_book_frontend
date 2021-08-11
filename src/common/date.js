import date from 'date-and-time'
window.dat = date
const formatStr = 'YYYY-MM-DD'

const get_time = time => {
  return (time === undefined || !(time instanceof Date)) ? new Date() : time
}


const date2date = time => {
  const time_date = get_time(time)
  const time_str = date2str(time_date)
  return str2date(time_str)
}

const date2str = time => {
  const time_date = get_time(time)
  return date.format(time_date, formatStr)
}

const date2num_pure = time => {
  const time_date = get_time(time)
  return Date.parse(time_date)
}

const date2num = time => {
  return date2num_pure(date2date(time))
}

const str2date = time_str => {
  return date.parse(time_str, formatStr)
}

const num2date_pure = time_num => {
  return new Date(time_num)
}

const num2date = time_num => {
  return date2date(num2date_pure(time_num))
}

const num2str = time_num => {
  return date2str(num2date_pure(time_num))
}

const str2num = time_str => {
  return date2num_pure(str2date(time_str))
}

const num2num = time_num => {
  return str2num(num2str(time_num))
}

const now = () => {
  return date2num()
}

const now_date = () => {
  return date2date()
}

export default {
  get_time,
  now,
  now_date,
  date2date,
  date2str,
  date2num,
  str2date,
  str2num,
  num2date,
  num2str,
  num2num
}