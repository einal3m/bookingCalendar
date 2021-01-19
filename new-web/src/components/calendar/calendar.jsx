import React from 'react';
import {connect} from 'react-redux';
import Header from './header.jsx';
import Navigator from './navigator.jsx';
import Month from './month';
import { getDays } from '../../api/day-api';

export function Calendar(props) {
  return (
      <div>
        <Header />
        <Navigator month={props.month} year={props.year}/>
        <Month days={props.days} month={props.month} year={props.year} guests={[]} />
      </div>
  );
}

function mapStoreToProps(store) {
  return {
    month: store.calendarMonth.get('month'),
    year: store.calendarMonth.get('year'),
    days: store.days.get('days').toJS()
  };
}

export default connect(mapStoreToProps)(Calendar);
