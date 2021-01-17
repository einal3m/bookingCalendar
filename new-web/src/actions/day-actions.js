import { getDays } from '../api/day-api';
import store from '../reducers/store';
import { resetMessages } from './notification-actions';
import { SET_DAYS, SET_REPORT_DAYS } from './action-types';
import { transformFromApi } from '../transformers/day-transformer';

export const loadDays = () => {
  resetMessages();

  let state = store.getState().calendarMonth.toJS();

  return getDays(state.month, state.year).then((days) => {
  	let transformedDays = {};
  	days.forEach(day => {
  		transformedDays[day.day] = transformFromApi(day)
  	});

    store.dispatch({type: SET_DAYS, days: transformedDays});
  });
};

export const loadDaysForYear = (year) => {
  for (let month = 1; month <= 12; month++) {
    loadSingleYear(month, year);
  }
};

const loadSingleYear = (month, year) => {
  getDays(month, year).then((days) => {
  	let transformedDays = {};
  	Object.keys(days).forEach(key => {
  		transformedDays[key] = transformFromApi(days[key])
  	});

    store.dispatch({type: SET_REPORT_DAYS, month: month, days: transformedDays});
  });
};
