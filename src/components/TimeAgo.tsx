import React from 'react';
import {parseISO, formatDistanceToNow} from 'date-fns';
import style from '../scss/labshome.scss';

const TimeAgo = ({ timestamp }: { timestamp:string }):JSX.Element => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (<span title={timestamp} className={style.timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>);
};

export default TimeAgo;