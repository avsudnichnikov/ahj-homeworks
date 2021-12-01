/* eslint-disable import/no-unresolved */
import addZeros from 'utls/addZeros';

export default function dateFormat(date = new Date()) {
  const year = addZeros(date.getFullYear());
  const month = addZeros(date.getMonth());
  const day = addZeros(date.getDate());
  const hour = addZeros(date.getHours());
  const min = addZeros(date.getMinutes());
  return `${hour}:${min} ${day}.${month}.${year}`;
}
