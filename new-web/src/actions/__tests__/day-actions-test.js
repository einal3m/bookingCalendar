import * as NotificationActions from '../notification-actions';
import store from '../../reducers/store';
import * as DayApi from '../../api/day-api';
import { loadDays, loadDaysForYear } from '../day-actions';
import * as Transformers from '../../transformers/day-transformer';

import { fromJS } from 'immutable';

describe('loadDays', () => {
  it('retrieves the days from backend and sends the transformed days to the store', () => {
    spyOn(store, 'getState').and.returnValue({calendarMonth: fromJS({month: 2, year: 2015})});
    spyOn(store, 'dispatch');
    spyOn(NotificationActions, 'resetMessages');

    let day = { day: '11', schoolHolidays: true };
    let apiDays = [day];
    let transformedDays = { '11': day };
    spyOn(DayApi, 'getDays').and.returnValue(Promise.resolve(apiDays))
    spyOn(Transformers, 'transformFromApi').and.returnValue(day);

    return loadDays().then(() => {
  		expect(DayApi.getDays).toHaveBeenCalledWith(2, 2015);
  		expect(NotificationActions.resetMessages).toHaveBeenCalled();
      expect(Transformers.transformFromApi).toHaveBeenCalledWith(day);
  		expect(store.dispatch).toHaveBeenCalledWith({ type: 'SET_DAYS', days: transformedDays });
    });
  });
});

xdescribe('loadDaysForYear', () => {
  it('retrieves the days for each month of the year and sends the transformed days to the store', () => {
    spyOn(store, 'dispatch');
    spyOn(NotificationActions, 'resetMessages');

    let apiDays = { '11': { school_holidays: true }};
    let transformedDays = { '11': { schoolHolidays: true }};

    spyOn(DayApi, 'getDays').and.returnValue(Promise.resolve(apiDays))
    spyOn(Transformers, 'transformFromApi').and.returnValue({ schoolHolidays: true });

    return loadDaysForYear(2018).then(() => {
      expect(DayApi.getDays).toHaveBeenCalledTimes(12);
      expect(DayApi.getDays.calls.argsFor(0)).toEqual(1, 2018)

      expect(NotificationActions.resetMessages).toHaveBeenCalled();

      expect(Transformers.transformFromApi).toHaveBeenCalledWith({ school_holidays: true });
      expect(Transformers.transformFromApi).toHaveBeenCalledTimes(12);

      expect(store.dispatch).toHaveBeenCalledWith({ type: 'SET_REPORT_DAYS', days: transformedDays });
    });
  });
});
