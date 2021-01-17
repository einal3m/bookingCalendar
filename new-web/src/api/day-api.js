import { get } from './http';

export const getDays = (month, year) => {
  let path = `calendar?year=${year}&month=${month}`;
  return get(path);
}
