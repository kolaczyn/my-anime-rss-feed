import { Axios } from 'axios';

const timeout = 4500;

export const axiosClient = new Axios({
  timeout,
  timeoutErrorMessage: `Timeout of ${timeout}ms reached. Got no response`,
});
