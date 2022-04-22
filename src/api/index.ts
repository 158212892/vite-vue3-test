import request from '../utils/instance.js';
import { ReqData } from './global';

export function temp(params: ReqData<unknown>) {
  return request.get('/src/assets/json/data.json', {
    params,
  });
}
