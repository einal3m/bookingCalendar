import { get } from '../http';

describe('get', () => {
  let path = 'my-path';

  it('returns the json response', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({json: () => 'json response'}));;

    await expect(get(path)).resolves.toBe('json response');

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:9292/moggs-booking-calendar/api/v1/my-path');
  });

  it('returns nothing if there is an error', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject({message: 'something'}));;

    await expect(get(path)).resolves.toBe(undefined);

    expect(window.fetch).toHaveBeenCalledWith('http://localhost:9292/moggs-booking-calendar/api/v1/my-path');
  });
});
