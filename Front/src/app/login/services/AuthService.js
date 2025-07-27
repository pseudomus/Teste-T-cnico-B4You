import axios from '@/lib/axios';

export const loginUser = (email, password) => {
  return axios.post('/auth/login', { email, password });
};
