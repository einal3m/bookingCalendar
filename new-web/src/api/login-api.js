import { post } from './http';

export const loginUser = (credentials) => {
  return post('login', credentials);
}
