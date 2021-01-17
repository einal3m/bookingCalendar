import { getDays } from '../day-api';
import * as http from '../http';

describe('getDays', () => {

  it('returns the json response', () => {
  	spyOn(http, 'get').and.returnValue('response');

  	expect(getDays(3, 2019)).toEqual('response');
  	expect(http.get).toHaveBeenCalledWith('calendar?year=2019&month=3');
  });
});
